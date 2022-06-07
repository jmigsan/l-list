//unused because using RTKQ

import { useGetLlistQuery } from "../../services/apiRTKQ";

const LList = () => {
  const { data, error, isLoading } = useGetLlistQuery();

  return (
    <div>
      {
        error ? (
          <div>Error</div>
        )
        : isLoading ? (
          <div>Loading</div>
        )
        : data ? (
          <div>
            {data.map(L => (
              <div key={L.l_id}>
                <div>{L.l_text}</div>
                <img src={L.l_content} />
              </div>
            ))}
          </div>
        )
        : null
      }
    </div>
  )
}
export default LList