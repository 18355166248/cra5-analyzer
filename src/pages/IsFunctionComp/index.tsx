import React, { FC, useMemo, useState } from "react";
import { CheckedButton } from "@xmly/mi-design";

interface Props {}

type StateProps = undefined | number;

const IsFunctionComp: FC<Props> = () => {
  const [state, setState] = useState<StateProps>(2222);

  const txt = useMemo(() => {
    return typeof state === "number" ? "是" : "否";
  }, [state]);

  return (
    <div>
      <CheckedButton
        prefixCls='jiang'
        onChange={(val) => (val[0] === 1 ? setState(undefined) : setState(222))}
        options={[{ label: "开关", value: 1 }]}
      />
      <div>是不是函数: {txt}</div>
    </div>
  );
};

export default IsFunctionComp;
