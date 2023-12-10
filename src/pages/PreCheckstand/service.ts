import { checkStandVersion } from "@xmly/checkstand";
import axios from "axios";
import qs from "qs";

const axiosInstance = axios.create();

// 模拟下单
export function getH5PayInfoRequest(params: any): Promise<any> {
  const {
    appIdentifier,
    domain,
    tradeType,
    orderItems,
    promotionItems,
    context = {},
    returnUrl,
    userContactId,
  } = params;

  const _orderItems = JSON.stringify(orderItems);

  const url = `${resolveRuntimeEnv()}/trade-v3/placeorder/h5`;

  const data: Record<string, any> = {
    appIdentifier: appIdentifier || "a1o6nonh0f14ltckcgg6o7uuq07l6sgm",
    domain: domain || 1,
    tradeType: tradeType || 1,
    orderItems: _orderItems,
    returnUrl: returnUrl || window.location.href,
    context: JSON.stringify({
      ...context,
      sourceType: "pre-JS",
      cashierVersion: checkStandVersion,
    }),
  };

  // 携带地址信息
  if (userContactId) data.userContactId = userContactId;

  if (promotionItems && promotionItems.length) {
    data.promotionItems = JSON.stringify(promotionItems);
  }
  return axiosInstance({
    method: "post",
    url,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true,
  });
}

function resolveRuntimeEnv(): string {
  const { hostname } = window.location;
  const map: Record<string, string> = {
    development: "",
    test: "//m.test.ximalaya.com",
    uat: "//m.uat.ximalaya.com",
    production: "//m.ximalaya.com",
  };

  let env = "";

  if (
    /(localhost|127\.0\.0\.1|dev\.test.ximalaya\.com|192\.168\..*)$/.test(
      hostname
    )
  ) {
    env = "development";
  } else if (/test\.ximalaya\.com$/.test(hostname)) {
    env = "test";
  } else if (/uat\.ximalaya\.com$/.test(hostname)) {
    env = "uat";
  } else {
    env = "production";
  }

  return map[env];
}
