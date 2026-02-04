/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from "../configs/env";
import {
  createWebApp,
  _ACTIONS_KEY as ACTIONS_KEY,
  _ROUTER_KEY as ROUTER_KEY,
  actionSdk as sdk,
  _WEDA_CLOUD_SDK,
} from "@cloudbase/weda-client";

const { initTcb, setConfig } = _WEDA_CLOUD_SDK;

declare global {
  interface Window {
    app?: object;
    $app?: object;
    $page?: object;
    $w?: object;
  }
}

const runtime = window;

let __app = undefined;
export const $w = new Proxy(__app?.__internal__?.$w || {}, {
  get(_, prop: string) {
    if (prop === "$app" || prop === "app") {
      return __app;
    }
    return __app?.__internal__?.$w?.[prop];
  },
});
__app = createGlboalApi();
const app = __app;

function mountAPIs(sdks) {
  Object.keys(sdks).forEach((item) => {
    let action = sdks[item];
    if (!(item in ACTIONS_KEY) && !(item in ROUTER_KEY)) {
      app[item] = action;
    }
  });
  return app;
}
mountAPIs(sdk);

function createGlboalApi() {
  const webApp = createWebApp();
  const globalAPI = new Proxy(
    Object.assign(webApp, {
      dataset: {},
      ...webApp,
      utils: {
        ...webApp.utils,
      },
    }),
    {
      get: (obj, prop) => {
        if (prop === "app" || prop === "$app") {
          return app;
        } else {
          return obj[prop];
        }
      },
    }
  );
// Override navigation helpers to work with react-router history (supports per-country routes like us/solutions)
try {
  const qs = (params: any) => {
    const s = new URLSearchParams();
    Object.entries(params || {}).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      s.set(k, String(v));
    });
    const out = s.toString();
    return out ? `?${out}` : '';
  };
  (globalAPI as any).utils = (globalAPI as any).utils || {};
  (globalAPI as any).utils.navigateTo = (arg: any) => {
    const history = (window as any)._WEAPPS_HISTORY;
    let path = '';
    if (typeof arg === 'string') {
      path = arg;
    } else if (arg && typeof arg === 'object') {
      const pageId = arg.pageId || arg.id || '';
      path = `/${pageId}${qs(arg.params)}`;
    }
    if (!path) return;
    if (history && typeof history.push === 'function') {
      history.push(path);
    } else {
      window.location.href = path;
    }
  };
  (globalAPI as any).utils.navigateBack = () => {
    const history = (window as any)._WEAPPS_HISTORY;
    if (history && typeof history.back === 'function') {
      history.back();
    } else {
      window.history.back();
    }
  };
} catch (e) {
  // ignore
}

  _injectApp2Runtime(globalAPI);

  return globalAPI;
}

function _injectApp2Runtime(globalAPI, hard = false) {
  runtime.app = hard ? globalAPI : runtime.app || globalAPI;
  runtime.$app = new Proxy(runtime.app, {
    get(obj, prop) {
      return obj ? obj[prop] : undefined;
    },
    set(obj, prop, value) {
      if (obj) {
        return (obj[prop] = value);
      } else {
        return undefined;
      }
    },
  });

  runtime.$w = new Proxy($w || globalAPI?.__internal__?.$w || {}, {
    get(_, prop: string) {
      const $page = runtime.app?.__internal__?.activePage || runtime.$page;

      if ($page?.__internal__?.$w?.[prop]) {
        return $page.__internal__.$w[prop];
      }

      if (_[prop]) {
        return _[prop];
      }

      return null;
    },
  });
}

export function createPageApi(): any {
  const $page = new Proxy(
    {
      __internal__: {
        active: false,
      },
      state: {},
      computed: {},
      handler: {},
      widgets: {},
      dataset: {},
      _dataBinds: {},
    },
    {
      get(obj, prop) {
        return prop === "$page" ? obj : obj[prop];
      },
    }
  );
  return $page;
}

setConfig({
  isProd: true,
  /** 低码应用ID */
  appID: "weda",
  /** 云开发环境ID */
  envID: envConfig.env,
  /** 应用端ID */
  tcbClientId: envConfig.env,
  /** 数据源描述对象数组 */
  dataSourceProfiles: [],
  /**
   * 新的dataset变量配置对象
   * key 为页面ID(全局为$global), val 为变量配置数组
   */
  datasetProfiles: {
    $global: {
      state: {},
      params: {},
    },
    home: {
      state: {},
    },
  },
  tcbApiOrigin: "",
  gatewayOrigin: "",
  isPrivate: false,
  beforeDSRequest: (cfg) => {
    if (!cfg.options || !cfg.options.showLoading) return;
    app.showLoading({});
  },
});

initTcb();
