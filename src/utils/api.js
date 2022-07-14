export function fetchPopularRepos (language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    // we are using promise to fetch the info
    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            if(!data) {
                throw new Error(data.message)
            }

            return data.items
        })

}
