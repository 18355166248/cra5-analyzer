/**
 * title: 限制长宽尺寸
 * description: 设置 `limitWidth` 或 `limitHeight` ，并使用`limitSize`限制图片文件大小(KB)，强制限定文件尺寸和大小，不符合时提示错误，停止上传。
 */

import { ImageUpload } from "@xmly/mi-design";
import React, { useState } from "react";

export default () => {
  const [url, setUrl] = useState<string>();

  return (
    <ImageUpload
      prefixCls="jiang"
      value={url}
      onChange={(val) => {
        setUrl(val as string);
      }}
    />
  );
};
