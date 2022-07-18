import { getAction } from "../config";

export const getUserInfo = (
  userName: string,
  dispatch: React.Dispatch<any>
) => {
  dispatch({
    type: "PENDING",
  });
  getAction(`/users/${userName}`).then((res: any) => {
    dispatch({
      type: "SET_USER_INFO",
      payload: res.data,
    });
    getUserRepos(userName, res.data, dispatch);
  });
};


//TODO: Ayrilacak.
const getUserRepos = async (
  userName: string,
  data: any,
  dispatch: React.Dispatch<any>
) => {
  getAction(`/users/${data.login}/repos`).then((res: any) => {
    dispatch({
      type: "SET_USER_REPOSITORIES",
      payload: res.data,
    });
    let items: any = [];
    for (let i = 0; i < res.data.length; i++) {
      getAction(`/repos/${userName}/${res.data[i].name}/languages`).then(
        (res: any) => {
          for (const [key, value] of Object.entries(res.data)) {
            let langInfo = {
              name: key,
              size: value,
            };
            items.push(langInfo);
          }
          dispatch({
            type: "SET_USER_ALL_LANGUAGES",
            payload: items,
          });
        }
      );
      let langsGroup = items.reduce(function (r: any, a: any) {
        console.log(a, r);
        r[a.name] = r[a.name] || [];
        r[a.name].push(a);
        return r;
      }, Object.create(null));

      console.log(langsGroup);

      let rates: any = [];
      Object.keys(langsGroup).map((item) => {
        let codeSum = 0;
        for (let j = 0; j < langsGroup[item].length; j++) {
          codeSum += langsGroup[item][j].size;
        }
        rates.push({ name: item, size: codeSum });
      });

      let totalRate: number = 0;

      for (let index = 0; index < rates.length; index++) {
        totalRate += rates[index].size;
      }

      for (let index = 0; index < rates.length; index++) {
        rates[index].size = ((100 * rates[index].size) / totalRate).toFixed(2);
      }
      console.log("llll", langsGroup);
    }
  });
  dispatch({
    type: "COMPLETED",
  });
};
