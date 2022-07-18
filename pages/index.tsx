import { MutableRefObject, useRef, useState, useContext } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import {
  Button,
  Card,
  Container,
  Flex,
  Input,
  Title,
} from "../components/UI/style";
import Spin from "../components/Icons/Spin";
import TwitterIcon from "../components/Icons/Twitter";
import LinkIcon from "../components/Icons/Link";
import UserContext from "../context/UserContext/store";
import { getUserInfo } from "../services/users/getUserInfo";

const Home: NextPage = () => {
  const [userLanguages, setUserLanguages] = useState<string[]>([]);

  const { state, dispatch } = useContext(UserContext);

  const isLoading: any = state.isLoading;
  const userInfo: any = state.userInfo;
  const userRepoInfo: any = state.userRepositories;

  console.log("state guncellendi", state);

  const userNameInputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const submitClick = async () => {
    getUserInfo(userNameInputRef.current.value, dispatch);
  };

  return (
    <Container>
      <Flex gap={12}>
        <Input block ref={userNameInputRef} placeholder="Enter username" />
        <Button style={{ minWidth: "100px" }} onClick={submitClick}>
          Search User
        </Button>
      </Flex>

      {isLoading ? (
        <Spin />
      ) : (
        Object.keys(userInfo).length > 0 && (
          <Card style={{ marginTop: "2rem" }} space={4} width={"100%"}>
            <Flex style={{ justifyContent: "space-between" }} gap={8}>
              <div className="flex justify-center gap-lg">
                <Image
                  className="rounded"
                  width={150}
                  height={150}
                  src={userInfo.avatar_url}
                />
                <div className="flex column gap-md justify-center">
                  <Link href={userInfo.html_url} passHref>
                    <a target={"_blank"}>
                      {" "}
                      <Title style={{ fontSize: "1.3rem" }}>
                        {userInfo.name}
                      </Title>
                    </a>
                  </Link>
                  <Link href={userInfo.html_url} passHref>
                    <a target={"_blank"}>
                      <span>@{userInfo.login}</span>
                    </a>
                  </Link>
                  <span>{userInfo.location}</span>
                  <div className="flex gap-sm align-center">
                    {userInfo.twitter_username && (
                      <Link
                        passHref
                        href={`https://twitter.com/${userInfo.twitter_username}`}
                      >
                        <a target={"_blank"}>
                          <TwitterIcon />
                        </a>
                      </Link>
                    )}
                    {userInfo.blog && (
                      <Link passHref href={`${userInfo.blog}`}>
                        <a target={"_blank"}>
                          <LinkIcon />
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex column gap-sm justify-center">
                <span>
                  Followers:{" "}
                  <span className="text-bold">{userInfo.followers}</span>
                </span>
                <span>
                  Following:{" "}
                  <span className="text-bold">{userInfo.following}</span>
                </span>
                <span>
                  Public Repository:{" "}
                  <span className="text-bold">
                    {userRepoInfo.length >= 30 ? "30+" : userRepoInfo.length}
                  </span>
                </span>
              </div>
            </Flex>
            <hr style={{ margin: "2rem 0" }} />
            <Flex>
              <div className="grid-container">
                {userLanguages.map((item: any) => (
                  <div className="grid-item">
                    <span className="text-bold">{item.name}</span>
                    <span style={{ fontSize: ".9rem" }}>%{item.size}</span>
                  </div>
                ))}
              </div>
            </Flex>
          </Card>
        )
      )}
    </Container>
  );
};

export default Home;
