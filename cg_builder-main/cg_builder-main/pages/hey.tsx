import getStaticProps from "@/src/main"

export default  function Hey({localData}:any) {
    
    const fetchData = async () => {
        const response = await fetch('/api/staticdata')
        const data = await response.json();
        console.log(data);
      }


    return (
        <div>
            <button onClick={fetchData}>Fetch</button>
        </div>
      )

  }
  