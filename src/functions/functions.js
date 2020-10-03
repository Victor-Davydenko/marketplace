

const getGQL = (url, headers = {}) =>
    (query = "", variables = {}) =>
        fetch(url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...headers
                },
                body: JSON.stringify({query, variables})
            })
            .then(res => res.json())
            .then(data => data.data)


const gql = getGQL('http://marketplace.asmer.fs.a-level.com.ua/graphql',{Authorization : "Bearer " + localStorage.authToken})

let d = ({1: path}, obj) => {
    path = path.split('.')
    for (let key of path) {
        if (obj[key] != undefined) {
            obj = obj[key]
        } else {
            return obj
        }
    }
    return obj
}

function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}

export  {gql, getGQL, d, isEmpty}