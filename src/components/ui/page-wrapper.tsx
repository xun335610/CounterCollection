import * as React from "react";

import { $w as base$W, createPageApi } from "@/lib/weda-client";
import { _WEDA_CLOUD_SDK as WEDA_CLOUD_SDK } from "@cloudbase/weda-client";
import querystring from "query-string";
const { createDataset, EXTRA_API } = WEDA_CLOUD_SDK;

function getPageTitle(id: string) {
  const APP_NAME = "DebtShield";
  const titleMap: Record<string, string> = {
    "us/home": "DebtShield",
    "us/assessment": "Risk Assessment",
    "us/solutions": "Solutions",
    "us/knowledge": "Knowledge",
    "us/illegal-collection": "Illegal Collection Details",
    "us/risk-warning": "Risk Warning",
    "us/state-laws": "State Rules",
    "us/disclaimer": "Disclaimer",
    "us/privacy": "Privacy",
    "cn/home": "债务护盾",
    "cn/assessment": "风险评估",
    "cn/solutions": "应对方案",
    "cn/knowledge": "知识库",
    "cn/illegal-collection": "违规催收详情",
    "cn/risk-warning": "风险提示",
  };

  if (id.startsWith("us/state-laws/")) {
    return `State Rules - ${APP_NAME}`;
  }

  const page = titleMap[id] || APP_NAME;
  return page === APP_NAME ? APP_NAME : `${page} - ${APP_NAME}`;
}

export function PageWrapper({
  id,
  Page,
  ...props
}: {
  id: string;
  Page: React.FunctionComponent<{ $w: typeof base$W }>;
}) {
  const $page = React.useMemo(() => {
    const $page = createPageApi();
    const dataset = createDataset(id, undefined, { appId: "weda" });
    Object.assign($page, {
      __internal__: {
        ...$page.__internal__,
        packageName: "",
        $w: new Proxy(base$W, {
          get(obj, prop: string) {
            /**
             * 使用当前的实例进行覆盖
             */
            if (prop === "$page" || prop === "page") {
              return $page;
            }

            return obj[prop];
          },
        }),
      },
      id,
      uuid: id,
      dataset,
    });

    return $page;
  }, []);

  const pageCodeContextRef = React.useRef($page);
  pageCodeContextRef.current = $page;

  React.useEffect(() => {
    const query =
      querystring.parse((location.search || "").split("?")[1] || "") || {};

    EXTRA_API.setParams(id, query || {}, { force: true });
    base$W.app.__internal__.activePage = pageCodeContextRef.current;
    return () => {
      if (pageCodeContextRef.current.__internal__) {
        pageCodeContextRef.current.__internal__.active = false;
      }
    };
  }, []);

  React.useEffect(() => {
    document.title = getPageTitle(id);
  }, [id]);

  return <Page {...props} $w={$page.__internal__.$w || base$W} />;
}
