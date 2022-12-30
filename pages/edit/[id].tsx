import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AddContactComp from "../../components/AddContact";

const EditContact = () => {
  const {
    query: { id },
  } = useRouter();
  //const [editData, setEditData] = useState<any>({});

  // useEffect(() => {
  //   let data = JSON.parse(window.localStorage.getItem("contactInfo") || "");
  //   let index = data?.find((item: any) => item?.id === id);
  //   setEditData(data[index as string]);
  // }, [id]);

  return (
    <>
      <AddContactComp details={id} />
    </>
  );
};

export default EditContact;
