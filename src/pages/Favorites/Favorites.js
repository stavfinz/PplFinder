import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";


const Favorites = () => {
  const { users, isLoading } = usePeopleFetch();

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} isFavorites={true} >
        </UserList>
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
