import storage from './util/storage'
const SCRIPT_KEY = 'SCRIPT_KEYS'
const SEARCH_TYPES = 'SEARCH_TYPES'

const getId = () => String(Math.random()).replace('0.', '')

/**
 *
 * ScriptPayload {
 *   script,
 *   name,
 *   code
 * }
 */
export const saveScript = payload => {
  return new Promise((resolve, reject) => {
    storage.get(SCRIPT_KEY, res => {
      const allScripts = res[SCRIPT_KEY] || []
      const newScript = {id: getId(), ...payload}
      allScripts.unshift(newScript)
      storage.set({...payload, [SCRIPT_KEY]: allScripts}, () => {
        if (chrome.runtime.error) return reject(chrome.runtime.error)
        resolve(allScripts)
      })
    })
  })
}

export const getAllScript = () => {
  return new Promise((resolve, reject) => {
    storage.get(SCRIPT_KEY, res => {
      if (chrome.runtime.error) return reject(chrome.runtime.error)
      resolve(res[SCRIPT_KEY] || [])
    })
  })
}

export const updateScript = payload => {
  return new Promise((resolve, reject) => {
    if (!payload.id) return reject()
    storage.get(SCRIPT_KEY, res => {
      if (chrome.runtime.error) return reject(chrome.runtime.error)
      const allScript = res[SCRIPT_KEY] || []
      console.log(allScript)
      const updateIndex = allScript.findIndex(i => i.id === payload.id)
      if (!~updateIndex) return reject('not found')
      allScript[updateIndex] = {...allScript[updateIndex], ...payload}
      storage.set({...res, [SCRIPT_KEY]: allScript}, () => {
        if (chrome.runtime.error) return reject(chrome.runtime.error)
        resolve(allScript)
      })
    })
  })
}

export const deleteScript = id => {
  return new Promise((resolve, reject) => {
    storage.get(SCRIPT_KEY, res => {
      if (chrome.runtime.error) return reject(chrome.runtime.error)
      const allScript = res[SCRIPT_KEY] || []
      const deleteIndex = allScript.findIndex(i => i.id === id)
      if (!~deleteIndex) return resolve()
      allScript.splice(deleteIndex, 1)
      storage.set({...res, [SCRIPT_KEY]: allScript}, () => {
        if (chrome.runtime.error) return reject(chrome.runtime.error)
        resolve(allScript)
      })
    })
  })
}

export const getAllTypes = () => getAllScript().then(scripts => scripts.map(s => s.type).reduce((p, c) => (!p.includes(c) && p.push(c), p), []))

// export const getAllTypes = () => getAllScript().then(scripts => scripts.reduce((p, {type}) => (!p.includes(type) && p.push(type), p), []))

export const getScriptById = (id) => {
  return new Promise((resolve, reject) => {
    storage.get(SCRIPT_KEY, res => {
      if (chrome.runtime.error) return reject(chrome.runtime.error)
      const allScript = res[SCRIPT_KEY] || []
      const item = allScript.find(i => i.id === id)
      if (!item) return reject('not found')
      resolve(item)
    })
  })
}

/**
 * TypePayload {
 *   id,
 *   name,
 * }
 */

// export const getAllTypes = () => {
//   return new Promise((resolve, reject) => {
//     storage.get(SEARCH_TYPES, res => {
//       if (chrome.runtime.error) return reject(chrome.runtime.error)
//       resolve(res[SEARCH_TYPES])
//     })
//   })
// }

// export const updateTypes = (payload) => {
//   return new Promise((resolve, reject) => {
//     storage.get(SEARCH_TYPES, res => {
//       if (chrome.runtime.error) return reject(chrome.runtime.error)
//       const ALL_TYPES = res[SEARCH_TYPES] || []
//       const changeItemIndex = ALL_TYPES.findIndex(i => i.id === payload.id)
//       if (~changeItemIndex) return reject('no changing item')
//       ALL_TYPES[changeItemIndex] = {
//         ...ALL_TYPES[changeItemIndex],
//         ...payload
//       }
//       // save
//       storage.set({
//         ...res,
//         [SEARCH_TYPES]: ALL_TYPES
//       }, () => {
//         resolve(ALL_TYPES)
//       })
//     })
//   })
// }

// export const addType = (payload) => {
//   return new Promise((resolve, reject) => {
//     storage.get(SEARCH_TYPES, res => {
//       if (chrome.runtime.error) return reject(chrome.runtime.error)
//       const allTypes = res[SEARCH_TYPES] || []
//       const newPayload = {id: getId(), ...payload}
//       allTypes.push(newPayload)
//       storage.set({...res, [SEARCH_TYPES]: allTypes}, res => {
//         if (chrome.runtime.error) return reject(chrome.runtime.error)
//         resolve(allTypes)
//       })
//     })
//   })
// }

// export const updateAllTypes = (types = []) => {
//   return new Promise((resolve, reject) => {
//     storage.set({[SEARCH_TYPES]: types}, () => {
//       if (chrome.runtime.error) return reject(chrome.runtime.error)
//       resolve(types)
//     })
//   })
// }

