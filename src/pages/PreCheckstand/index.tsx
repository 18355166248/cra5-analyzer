import type {
  BaseCallbackParams,
  PayBeforeCallbackParams,
  PayErrorCallbackParams,
  PaySuccessCallbackParams,
} from "@xmly/checkstand";
import {
  CheckStand,
  checkStandVersion,
  lyConfigApiList,
} from "@xmly/checkstand";
import React, { useEffect, useState, type FC } from "react";
import "./index.less";
import { getH5PayInfoRequest } from "./service";

const ua = window.navigator.userAgent;
export const isInNative = /(iting|xmly\(baby\))/i.test(ua); // 主站和喜马儿童

const itemData = [
  {
    amount: 5,
    show: true,
  },
  {
    amount: 10,
    show: true,
  },
  {
    amount: 300,
    show: false, // 隐藏收银台
  },
];

const itemInfo = {
  orderItems: [
    {
      itemId: "1010500003497727",
      quantity: 1,
    },
  ],
  context: {
    orderSource: "Vip_20220222,11233",
    specialModeStatus: "0",
    orderFrom: 1,
    executionEnvType: 1,
    orderSourceType: 18,
    orderSourceValue: "",
    jointVipPromoter: 1,
  },
  domain: 1 as 1,
  tradeType: 1 as 1,
  appIdentifier: "a1o6nonh0f14ltckcgg6o7uuq07l6sgm",
  promotionItems: [],
};

const Checkstand: FC<{ title: string }> = () => {
  const [item, setItem] = useState<{ amount: number; show: boolean }>();
  const [init, setInit] = useState(false);
  const [showCheckStand, setShowCheckStand] = useState(false);
  const [placeHolderConfig, setPlaceHolderConfig] = useState<{
    type: "custom" | "inline";
  }>({
    type: "custom",
  });

  useEffect(() => {
    if (isInNative && "ly" in window) {
      (window as any).ly.config({
        appId: "c091cf7e47316edbe57600636fe736ac", // 必填，应用ID
        apiList: [...lyConfigApiList], // 必填，需要使用的jsapi列表
      });
      (window as any).ly.ready(() => {
        // 需要立即调用native能力的接口在这里初始化,点击触发的可以不用写这里
        setInit(true);
      });
    } else {
      setInit(true);
    }
  }, []);

  const [checkStand] = CheckStand.useCheckStand();

  async function onPay() {
    if (!item) {
      alert("请选择商品");
    }
    if (showCheckStand) {
      const placeOrderParams = itemInfo;
      try {
        if (placeHolderConfig.type === "custom") {
          // 走自定义下单
          const { data } = await getH5PayInfoRequest(placeOrderParams);
          checkStand.pay(data);
        } else {
          // 走内置下单
          checkStand.pay();
        }
      } catch (error) {
        alert("下单失败");
      }
      return;
    }

    alert("请选择商品展示简易收银台");
  }

  function onShow() {
    console.log("简易收银台展示");
  }
  function onClose() {
    console.log("简易收银台隐藏");
  }
  function onShowPopup() {
    console.log("简易收银台浮层展示");
  }
  function onClosePopup() {
    console.log("简易收银台浮层隐藏");
  }
  function onSelectMethod({
    selectedMethod,
    selectedHuaBei,
    selectedDcPayType,
  }: BaseCallbackParams) {
    console.log(
      "onSelectMethod",
      selectedMethod,
      selectedHuaBei,
      selectedDcPayType
    );
  }
  function onPayBefore(params: PayBeforeCallbackParams) {
    console.log("onPayBefore", params);
  }
  function onPaySuccess(params: PaySuccessCallbackParams) {
    console.log("onPaySuccess", params);
  }
  function onPayError(params: PayErrorCallbackParams) {
    console.log("onPayError", params);
  }
  function onPlaceOrderFail(errorCode: number, errorMsg: string) {
    console.log("onPlaceOrderFail", errorCode, errorMsg);
  }
  function onPlaceOrderSuccess(res: any) {
    console.log("onPlaceOrderSuccess", res);
  }

  return (
    <div className="buy-demo">
      <div className="text-gray-500 mb-10 text-xs">
        收银台组件版本号: {checkStandVersion}
      </div>
      {/* <div style={{ minHeight: '100vh' }}>
        {Array.from({ length: 10 })
          .fill(1)
          .map((v, i) => (
            <div className="card-item" key={i}>
              {i + 1}
            </div>
          ))}
      </div> */}
      <div className="item-list">
        {itemData.map((v) => (
          <div
            className={item?.amount === v.amount ? "active" : ""}
            key={v.amount}
            onClick={() => {
              setShowCheckStand(v.show);
              if (v.show) {
                setItem({ amount: v.amount, show: v.show });
              } else {
                setItem(undefined);
              }
            }}
          >
            商品: {v.amount}元 (点击切换商品) {v.show ? "" : "(隐藏收银台)"}
          </div>
        ))}
      </div>
      {init && item && (
        <>
          <CheckStand
            instance={checkStand}
            item={item}
            visible={showCheckStand}
            onShow={onShow}
            onClose={onClose}
            onShowPopup={onShowPopup}
            onClosePopup={onClosePopup}
            onSelectMethod={onSelectMethod}
            onPayBefore={onPayBefore}
            onPaySuccess={onPaySuccess}
            onPayError={onPayError}
            onPlaceOrderFail={onPlaceOrderFail}
            onPlaceOrderSuccess={onPlaceOrderSuccess}
            placeOrderParams={{
              needPlaceOrder: placeHolderConfig.type === "inline", // 优先级高于pay方法的参数
              ...itemInfo,
            }}
          />
          {showCheckStand ? (
            <div className="flex justify-evenly mt-4 text-orange-500">
              <span
                className="flex items-center"
                onClick={() => {
                  setPlaceHolderConfig({ type: "inline" });
                }}
              >
                <input
                  type="radio"
                  onChange={() => {}}
                  checked={placeHolderConfig.type === "inline"}
                  className="mr-1 checked:bg-orange-500 ..."
                />
                内置下单
              </span>
              <span
                className="flex items-center"
                onClick={() => {
                  setPlaceHolderConfig({ type: "custom" });
                }}
              >
                <input
                  type="radio"
                  onChange={() => {}}
                  checked={placeHolderConfig.type !== "inline"}
                  className="mr-1 checked:bg-orange-500 ..."
                />
                自定义下单
              </span>
            </div>
          ) : null}
        </>
      )}

      <div
        className="ok-btn text-orange-500 border border-orange-500 border-solid"
        onClick={onPay}
      >
        <span className="text-slate-800 text-xs">确认支付</span> 请在站内打开
      </div>
      <div
        className="mt-10 text-orange-600"
        onClick={() => window.location.reload()}
      >
        刷新页面
      </div>
    </div>
  );
};

export default Checkstand;
