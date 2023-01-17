import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, FlexBox, FlexColumn } from "../components/StyledComponents";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Avatar, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const StyledBox = styled(Box)`
  border-radius: 10px;
  border: 1px solid grey;
  margin: 5px;
  padding: 8px;
  position: relative;
`;

export default function Home() {
  const [contactDetails, setContactDetails] = useState<any>([]);

  useEffect(() => {
    window.localStorage.getItem("contactInfo") &&
      setContactDetails(
        JSON.parse(window.localStorage.getItem("contactInfo") || "")
      );
  }, []);

  console.log("main", contactDetails);

  const { push } = useRouter();
  const handleClick = () => {
    push("/add");
  };
  const handleEdit = (index: any) => {
    push(`/edit/${index}`);
  };

  return (
    <FlexColumn
      style={{
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      {contactDetails?.length > 0 ? (
        <Box style={{ width: "100%" }}>
          <FlexBox
            style={{
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <h3>Contact Details</h3>
          </FlexBox>
          {contactDetails?.map((item: any, index: any) => {
            return (
              <StyledBox key={index}>
                <FlexBox
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <FlexBox style={{ alignItems: "center" }}>
                    <Box
                      style={{
                        marginRight: "8px",
                      }}
                    >
                      <Avatar>{item?.name?.slice(0, 1).toUpperCase()}</Avatar>
                    </Box>
                    <h4 style={{ margin: 0 }}>{item?.name}</h4>
                  </FlexBox>
                  {item?.isWhatsApp && (
                    <Box>
                      <WhatsAppIcon />
                    </Box>
                  )}
                </FlexBox>
                <Box
                  style={{ position: "absolute", top: 0, right: 0 }}
                  onClick={() => handleEdit(item?.id)}
                >
                  <EditIcon />
                </Box>
              </StyledBox>
            );
          })}
        </Box>
      ) : (
        <h3>No contacts to display</h3>
      )}
      <Box style={{ justifyContent: "center" }}>
        <Button color="primary" variant="contained" onClick={handleClick}>
          + Add Contact
        </Button>
      </Box>
    </FlexColumn>
  );
}
