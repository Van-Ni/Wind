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
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

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
              let avatarUrl;
              let firstName;
              let lastName;

              // console.log(contact)

              if (contact.participants[0]._id != userId) {
                firstName = contact.participants[0].firstName;
                lastName = contact.participants[0].lastName;
                const avatar = contact.participants[0].avatar;
                if (avatar) {
                  avatarUrl = avatar.url;
                }
              } else {
                firstName = contact.participants[1].firstName;
                lastName = contact.participants[1].lastName;
                const avatar = contact.participants[1].avatar;
                if (avatar) {
                  avatarUrl = avatar.url;
                }
              }
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={
                        avatarUrl ||
                        "https://bootdey.com/img/Content/avatar/avatar2.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{`${lastName} ${firstName}`}</h3>
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
    overflow: auto;
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
      width: 90%;
      border-radius: 0.2rem;
      padding: 4px;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        height: 40px;
        width: 40px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 24px;
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
    gap: 0.8rem;
    .avatar {
      width: 50px;
      height: 50px;
      img {
        border: 2px solid #ccc;
        border-radius: 24px;
        height: 100%;
        width: 100%;
        max-inline-size: 100%;
        object-fit: fill;
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
