import { message } from "antd";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const codeMessage: Record<number, string> = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，服务器返回422错误，说明对象验证失败。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};
const errorHandler = (error: AxiosError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    message.error(`${response.status}: ${errorText}`);
  } else {
    message.error("网络请求错误，请检查您的网络连接或稍后再试。");
  }
  return response;
};

/**
 * 发起网络请求
 *
 * @template T 响应数据的类型，默认为any
 * @param config Axios请求配置对象
 * @returns 返回一个Promise，resolve为AxiosResponse<T>类型，reject为Error类型
 */
const request: <T = any>(
  config: AxiosRequestConfig
) => Promise<AxiosResponse<T>> = (config) => {
  const instance: AxiosInstance = axios.create({
    baseURL: "",
    timeout: 60000,
  });
  // 请求拦截器
  instance.interceptors.request.use(
    (req) => {
      message.loading("请求中...");
      return req;
    },
    (error) => {
      message.error("请求失败，请稍后再试。");
      return Promise.reject(error);
    }
  );
  // 响应拦截器
  instance.interceptors.response.use((res) => {
    message.destroy();
    return res;
  }, errorHandler);
  return instance(config);
};
export default request;
