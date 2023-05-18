import React, { FC, useState } from "react";
import { CheckedButton } from "@xmly/mi-design";
import BtnList from "./BtnList";
import FilterForm from "./FilterFormLayout";

interface Props {}

const MiDesign: FC<Props> = () => {
  const [selectedKeys, setSelectedKeys] = useState(["2"]);

  function onChangeMenu(keys: string[], value: any) {
    console.log(keys, value);
    setSelectedKeys(keys);
  }
  return (
    <div style={{ padding: 20 }}>
      <CheckedButton
        prefixCls="jiang"
        options={[
          { label: "北京", value: 1 },
          { label: "上海", value: 2 },
          { label: "安徽", value: 3 },
        ]}
      />
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <Menu
          items={items}
          onChange={onChangeMenu}
          selectedKeys={selectedKeys}
        />
      </div> */}
      <BtnList />
      <FilterForm />
    </div>
  );
};

export default MiDesign;
