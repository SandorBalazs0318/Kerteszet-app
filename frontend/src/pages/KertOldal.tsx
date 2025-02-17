import { useEffect, useState } from "react";
import { Kert } from "../type/Kert";
import ApiClient from "../api/ApiClient";
import { useParams } from "react-router-dom";

const KertOldal = () => {
  const [kertadatok, setKertAdatok] = useState<Kert | null>(null);
  const [newar, setNewAr] = useState(0);

  const {id} = useParams();

  useEffect(() => {
    const FetchGet = async () => {
      try {
        const response = await ApiClient.get(`/${id}`);
        setKertAdatok(response.data);
        setNewAr(response.data.ar);
      } catch (ex) {
        console.log(ex || "Hiba a Get kérés közben.");
      }
    };
    FetchGet();
  }, []);

  const DeleteKert = async () => {
    try{
        await ApiClient.delete(`/ ${id}`)
    }catch(ex){
        console.log(ex || "Hiba a törlés közben.");
    }
  }

  return (
    <div>
      <p>Név: {kertadatok?.Név}</p>
      <p>Ár: {kertadatok?.Ár}</p>
       <p>Új ár: <input 
        type="string"
        value={newar}
        onChange={(e) => setNewAr(Number(e.target.value))}
        placeholder="Add meg az új árat"
        /></p>
      <p>Évelő-e: {kertadatok?.Évelő_e}</p>
      <p>Kategória: {kertadatok?.Kategória.fa}</p>
      <button onClick={DeleteKert} style={{color: "red"}}>Törlés</button>
    </div>
  );
};

export default KertOldal;
