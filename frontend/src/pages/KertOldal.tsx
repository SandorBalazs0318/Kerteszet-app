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
      <p>Évelő-e: {kertadatok?.Évelő_e}</p>
      <p>Kategória: {kertadatok?.Kategória.fa}</p>
    </div>
  );
};

export default KertOldal;
