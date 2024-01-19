// custome hook - function

import { useEffect,useState } from "react"


const useFetch=(url)=>{
    const [data, setData] = useState(null)
    // calls the fetch when the page loads
        useEffect(()=>{
            // fetch returns promise
            fetch(url).then(res=>{
                // .json() to remove unneccessary data
                res.json().then(result=>{
                    setData(result.products)
                })
            })
        },[])
        return data
}

export default useFetch;