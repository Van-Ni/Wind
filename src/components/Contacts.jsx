import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [userEmail, setUserEmail] = useState(undefined);
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (state && state.id) {
      const index = contacts.findIndex(
        (item) => item.participants[0]._id === state.id
      );
      const contact = contacts.find(
        (item) => item.participants[0]._id === state.id
      );
      setCurrentSelected(index);
      changeChat(contact);
    }
  }, [state, contacts]);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const storedData = {
      username: userEmail,
      avatarImage: "dummy-avatar-image",
    };
    setCurrentUserName(storedData.username);
    setCurrentUserImage(storedData.avatarImage);
  }, [userEmail]);

  useEffect(() => {
    if (sessionStorage.getItem("email")) {
      setUserEmail(sessionStorage.getItem("email"));
    }
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h3>Wind</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  {/* <div className="avatar">
                    <img
                      src={contact.participants[0].avatar.url}
                      alt=""
                    />
                  </div> */}
                  <div className="username">
                    <h3>{`${contact.participants[0].lastName} ${contact.participants[0].firstName}`}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={`${sessionStorage.getItem("avatar")}`} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #fff;
  border-right: 1px solid #ccc;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 22px;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: black;
      text-transform: uppercase;
    }
    border-bottom: 1px solid #ccc;
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    // overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #fff;
      min-height: 55px;
      cursor: pointer;
      width: 100%;
      border-radius: 0.2rem;
      padding: 20px;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
        }
      }
      .username {
        h3 {
          color: #000;
          font-size: 16px;
        }
      }
    }
    .selected {
      background-color: #e5efff;
    }
  }

  .current-user {
    background-color: #3b71ca;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    .avatar {
      img {
        object-fit: fill;
        max-width: 100%;
        border-radius: 62px;
        width: 45px;
        height: 45px;
      }
    }
    .username {
      h2 {
        color: white;
        font-size: 16px;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 10px;
        }
      }
    }
  }
`;
