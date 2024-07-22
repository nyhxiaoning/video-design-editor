import request from "@/adapter/ajax";

/**
 * 获取资源配置
 *
 * @param type 资源类型
 * @returns 返回请求结果
 */
export function getResoueceConfig(type: string) {
  return request({ url: `/api/resource?type=${type}`, method: "GET" });
}
