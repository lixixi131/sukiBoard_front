import { Cookies } from "react-cookie";
const Cookie = new Cookies();

export const setCookie = (name, value, option) => {
    return Cookie.set(name, value, { ...option });
  };
  
  export const getCookie = (name) => {
    return Cookie.get(name);
  };
  
  export const removeCookie = (name, option) => {
    return Cookie.remove(name, { ...option });
  };