import { useEffect, useState } from "react"
import { Kert } from "../type/Kert"
import ApiClient from "../api/ApiClient";

const KertekOldal = () => {
    const [kertek, setKertek] = useState<Array<Kert>>(Array<Kert>);

    useEffect(() => {
        const FetchGet = async () => {
            try{
                const response = await ApiClient.get("/");
                setKertek(response.data);
            }catch(ex){
                console.log(ex || "Hiba a Get kérés közben.");
            }
        }
        FetchGet();
    }, [])

    return(
        <div>
            <table>
                <thead>
                    <th>Név</th>
                    <th>Ár</th>
                    <th>Évelő-e</th>
                    <th>Kategória</th>
                </thead>
                <tbody>
                    {kertek.map((kertek)=>(
                        <tr>
                            <td>{kertek.Név}</td>
                            <td>{kertek.Ár}</td>
                            <td>{kertek.Évelő_e}</td>
                            <td>{kertek.Kategória.fa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default KertekOldal