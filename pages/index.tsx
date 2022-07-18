import { MutableRefObject, useRef, useState } from "react";
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
import { getAction } from "../services/config";
import TwitterIcon from "../components/Icons/Twitter";
import LinkIcon from "../components/Icons/Link";

const Home: NextPage = () => {
  const [userInfo, setUserInfo] = useState<{ [key: string]: any }>({});
  const [userRepoInfo, setUserRepoInfo] = useState<string[]>([]);
  const [userLanguages, setUserLanguages] = useState<string[]>([]);

  const userNameInputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const submitClick = async () => {
    let response: any = await getAction(
      `/users/${userNameInputRef.current.value}`
    );
    let reposResponse: any = await getAction(
      `/users/${userNameInputRef.current.value}/repos`
    );

    let items = [];

    for (let i = 0; i < reposResponse.data.length; i++) {
      let deneme: any = await getAction(
        `/repos/${userNameInputRef.current.value}/${reposResponse.data[i].name}/languages`
      );
      for (const [key, value] of Object.entries(deneme.data)) {
        let langInfo = {
          name: key,
          size: value,
        };
        items.push(langInfo);
      }
    }
    let langsGroup = await items.reduce(function (r, a) {
      r[a.name] = r[a.name] || [];
      r[a.name].push(a);
      return r;
    }, Object.create(null));

    console.log(langsGroup);

    let rates: any = [];
    Object.keys(langsGroup).map((item) => {
      let codeSum = 0;
      for (let j = 0; j < langsGroup[item].length; j++) {
        codeSum += langsGroup[item][j].size;
      }
      rates.push({ name: item, size: codeSum });
    });

    setUserRepoInfo(reposResponse.data);
    setUserInfo(response.data);

    let totalRate: number = 0;

    for (let index = 0; index < rates.length; index++) {
      totalRate += rates[index].size;
    }

    for (let index = 0; index < rates.length; index++) {
      rates[index].size = ((100 * rates[index].size) / totalRate).toFixed(2);
    }
    setUserLanguages(rates);
  };

  return (
    <Container>
      <Flex gap={12}>
        <Input block ref={userNameInputRef} placeholder="Enter username" />
        <Button style={{ minWidth: "100px" }} onClick={submitClick}>
          Search User
        </Button>
      </Flex>
      {Object.keys(userInfo).length > 0 && (
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
      )}
    </Container>
  );
};

export default Home;
