import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "./StyledComponents";

const Conatiner = styled.div`
  width: 100%;
  box-shadow: 0px 3px 10px grey;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
`;

const FlexBox = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
`;
const FlexColumn = styled(FlexBox)`
  flex-direction: column;
`;

const StyledFlexBox = styled(FlexBox)`
  align-items: center;
`;

const AddContactComp = (props: any) => {
  const {
    push,
    query: { id },
  } = useRouter();

  const [contactInfo, setContactInfo] = useState<any>({
    name: "",
    type: "personal",
    phone: "",
    isWhatsApp: false,
  });

  useEffect(() => {
    if (id) {
      let data = JSON.parse(window.localStorage.getItem("contactInfo") || "");
      let indexValue = data?.findIndex((item: any) => item?.id == id);
      setContactInfo(data[indexValue as string]);
    }
  }, [props.details]);

  const addContact = () => {
    console.log("info", contactInfo);
    let previousData = [];
    if (window.localStorage.getItem("contactInfo")) {
      previousData = JSON.parse(
        window.localStorage.getItem("contactInfo") || ""
      );
      window.localStorage.setItem(
        "contactInfo",
        JSON.stringify([
          ...previousData,
          { id: new Date().getTime(), ...contactInfo },
        ])
      );
    } else {
      window.localStorage.setItem(
        "contactInfo",
        JSON.stringify([{ id: new Date().getTime(), ...contactInfo }])
      );
    }
    setContactInfo({
      name: "",
      type: "personal",
      phone: "",
      isWhatsApp: false,
    });
    push("/");
  };

  const handleChange = (key: string, value: string | number | boolean) => {
    setContactInfo({ ...contactInfo, [key]: value });
  };

  const updateContact = () => {
    let dataTobeedited = [
      ...JSON.parse(window.localStorage.getItem("contactInfo") || ""),
    ];
    let index = dataTobeedited?.findIndex(
      (item: any) => item.id == props.details
    );
    dataTobeedited[index] = contactInfo;
    console.log("editdata", dataTobeedited);
    window.localStorage.setItem(
      "contactInfo",
      JSON.stringify([...dataTobeedited])
    );
    push("/");
  };

  const deleteContact = () => {
    let datatobeDeleted = [
      ...JSON.parse(window.localStorage.getItem("contactInfo") || ""),
    ];
    datatobeDeleted = datatobeDeleted?.filter((item: any) => item.id != id);
    window.localStorage.setItem(
      "contactInfo",
      JSON.stringify([...datatobeDeleted])
    );
    push("/");
  };

  return (
    <Conatiner>
      {id ? (
        <StyledFlexBox>
          <h3>Edit Contact</h3>
          <Box>
            <Button
              color="secondary"
              variant="contained"
              onClick={deleteContact}
            >
              Delete
            </Button>
          </Box>
          <Box>
            <Button color="primary" variant="contained" onClick={updateContact}>
              Update
            </Button>
          </Box>
        </StyledFlexBox>
      ) : (
        <StyledFlexBox>
          <h3>Add Contact</h3>{" "}
          <Box>
            <Button
              color="primary"
              variant="contained"
              onClick={addContact}
              disabled={contactInfo?.name == "" || contactInfo?.phone == ""}
            >
              Add
            </Button>
          </Box>
        </StyledFlexBox>
      )}

      <FlexBox>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type={"text"}
          value={contactInfo?.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </FlexBox>
      <FlexBox>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="number"
          value={contactInfo?.phone}
          onChange={(e) => handleChange("phone", +e.target.value)}
        />
      </FlexBox>
      <FlexBox>
        <label htmlFor="type">Type</label>
        <select
          id="type"
          onChange={(e) => handleChange("type", e.target.value)}
          value={contactInfo?.type}
        >
          <option value="personal">Personal</option>
          <option value="office">Office</option>
        </select>
      </FlexBox>
      <FlexBox>
        <label htmlFor="isWhatsApp">Is Whatsapp</label>

        <input
          type="radio"
          id="isWhatsApp"
          name={"isWhatsApp"}
          checked={contactInfo?.isWhatsApp == true}
          onChange={(e) => handleChange("isWhatsApp", e.target.checked)}
        />
      </FlexBox>
    </Conatiner>
  );
};

export default AddContactComp;
