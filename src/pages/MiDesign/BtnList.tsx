import { ActionList } from "@xmly/mi-design";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const list = [
    {
      text: "查看详情",
      type: "text" as "text",
      onClick: () => {
        console.log("查看详情");
      },
    },
    {
      text: "禁用",
      type: "text" as "text",
      disabled: true,
      onClick: () => {
        console.log("禁用");
      },
    },
    {
      text: "文本Tips",
      type: "text" as "text",
      toolTip: {
        title: "Tips测试",
      },
      onClick: () => {
        console.log("文本Tips");
      },
    },
    {
      text: "Confirm",
      type: "confirm" as "confirm",
      confirmText: "确定要执行本次操作么？",
      onClick: () => {
        console.log("Confirm");
      },
    },
    {
      text: "浮层按钮",
      type: "text" as "text",
      disabled: true,
      onClick: () => {
        console.log("查看详情");
      },
    },
  ];
  return (
    <>
      <ActionList prefixCls="jiang" columns={list} max={1} />
      <ActionList prefixCls="jiang" columns={list} max={2} />
      <ActionList prefixCls="jiang" columns={list} max={3} />
      <ActionList prefixCls="jiang" columns={list} max={4} />
    </>
  );
};
