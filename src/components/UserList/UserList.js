import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { Checkbox } from "@material-ui/core";

const UserList = ({ users, isLoading ,isFavorites}) => {

  const [hoveredUserId, setHoveredUserId] = useState();
  const [filterCounter, setFilterCounter] = useState(0);
  const [currentUsers,setCurrentUsers] = useState([]);
  const [savedFavoriteUsers,setSavedFavoriteUsers] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  const [updated,setUpdated] = useState(false);


  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const onChange = (value,isChecked)=>{
    
    if(!isFavorites){//Home page
      if(isChecked){//CheckBox Signed
        setFilterCounter(filterCounter+1);
        if(filterCounter>=1){
          setCurrentUsers([...currentUsers,
            ...users.filter(user => user.nat === value)]);
        }else{
          setCurrentUsers([...users.filter(user => user.nat === value)]);
        }
      }else{//CheckBox isn't Signed
        setFilterCounter(filterCounter-1);
        setCurrentUsers([...currentUsers.filter(user=>user.nat !== value)]);
      }
    }else{//Favorites page

      if(isChecked){//CheckBox Signed
        setFilterCounter(filterCounter+1);
        if(filterCounter>=1){
          setCurrentUsers([...currentUsers,
            ...savedFavoriteUsers.filter(user => user.nat === value)]);
        }else{
          setCurrentUsers([...savedFavoriteUsers.filter(user => user.nat === value)]);
        }
      }else{//CheckBox isn't Signed
        setFilterCounter(filterCounter-1);
        setCurrentUsers([...savedFavoriteUsers.filter(user=>user.nat !== value)]);
        setUpdated(!updated);
      }
    }
  };

  useEffect(() => { 
    if(filterCounter===0){
      if(!isFavorites)
        setCurrentUsers(users);//Home page
      else
        setCurrentUsers(savedFavoriteUsers);//Favorites page
    }
    localStorage.setItem("favorites",JSON.stringify(savedFavoriteUsers));
    console.log(savedFavoriteUsers);
  });

  const handleClickFavorite = (isVisible) => {
    if(isVisible){
      if(!isFavorites){//Home page
        // console.log("heart clicked ",currentUsers[hoveredUserId]);
        if(!savedFavoriteUsers.includes(currentUsers[hoveredUserId])){//If isn't there it means that the user wants to add it to favorites
          setSavedFavoriteUsers([...savedFavoriteUsers,currentUsers[hoveredUserId]]); 
        }
        else{
          setSavedFavoriteUsers([...savedFavoriteUsers.filter(user=>user !==currentUsers[hoveredUserId])]);//If it's there it means that the user wants to remove it from favorites
        }
      }else{//Favorites page
        setSavedFavoriteUsers([...savedFavoriteUsers.filter(user=>user !==currentUsers[hoveredUserId])]);
        
      } 
    }
  }

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil"  onChange={onChange} />
        <CheckBox value="AU" label="Australia"  onChange={onChange} />
        <CheckBox value="CA" label="Canada"  onChange={onChange}/>
        <CheckBox value="DE" label="Germany"  onChange={onChange}/>
        <CheckBox value="NL" label="Netherlands"  onChange={onChange}/>
      </S.Filters>
      <S.List>
        {currentUsers.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={index === hoveredUserId || savedFavoriteUsers.includes(user)}
               onClick={handleClickFavorite}  >
                <IconButton> 
                  <FavoriteIcon color="error"  />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
