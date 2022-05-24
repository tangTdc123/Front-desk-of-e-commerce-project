
export const setToken=function(token){
    return localStorage.setItem('token',token)
}

export const getToken=function(){
    return localStorage.getItem('token')
}
export const clearToken=function(){
    return localStorage.removeItem('token')
}