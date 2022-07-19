import { getAction } from '../config'

export const getUserInfo = async (userName: string, dispatch: React.Dispatch<any>) => {
  dispatch({
    type: 'PENDING',
  })
  try {
    let response: any = await getAction(`/users/${userName}`)
    dispatch({
      type: 'SET_USER_INFO',
      payload: response.data,
    })
    getUserRepos(response.data, dispatch)
  } catch (error) {
    dispatch({
      type: 'USER_NOT_DEFINED',
      payload: error,
    })
  }
}

const getUserRepos = async (data: any, dispatch: React.Dispatch<any>) => {
  let response: any = await getAction(`/users/${data.login}/repos`)
  dispatch({
    type: 'SET_USER_REPOSITORIES',
    payload: response.data,
  })
  getUserLanguages(data.login, response.data, dispatch)
}

const getUserLanguages = async (userName: string, repos: any, dispatch: React.Dispatch<any>) => {
  let languages: object[] = []

  for (let i = 0; i < repos.length; i++) {
    let res: any = await getAction(`/repos/${userName}/${repos[i].name}/languages`)

    for (const [key, value] of Object.entries(res.data)) {
      let langInfo = {
        name: key,
        size: value,
      }
      languages.push(langInfo)
    }
    dispatch({
      type: 'SET_USER_ALL_LANGUAGES',
      payload: languages,
    })

    let langsGroup = languages.reduce(function (pre: any, curr: any) {
      pre[curr.name] = pre[curr.name] || []
      pre[curr.name].push(curr)
      return pre
    }, Object.create(null))

    let rates: any = []
    Object.keys(langsGroup).map((item) => {
      let codeSum = 0
      for (let j = 0; j < langsGroup[item].length; j++) {
        codeSum += langsGroup[item][j].size
      }
      rates.push({ name: item, size: codeSum })
    })

    let totalRate: number = 0
    for (let index = 0; index < rates.length; index++) {
      totalRate += rates[index].size
    }

    for (let index = 0; index < rates.length; index++) {
      rates[index].size = ((100 * rates[index].size) / totalRate).toFixed(2)
    }

    dispatch({
      type: 'SET_USER_TOGETHER_LANGUAGES',
      payload: rates,
    })
  }
  dispatch({
    type: 'COMPLETED',
  })
}
