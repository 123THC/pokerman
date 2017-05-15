# Poker Man

###GA WDI London - Project 2

#### Introducing Poker Man

This website is designed to allow users to host poker nights at their house and other users of the site can reserve a seat to join them. The idea of the site came from often having poker nights with my friends but then if people dropped out or didn't want to bet then it ruined the evening the somewhat! I thought that if there was a site to advertise and invite other poker plays to games at your house then that would eliminate both problems. So I made that site.

#####[View it here!](https://wdi-25-project-2.herokuapp.com/)


![](/src/assets/images/homePage.png)


#####The Build

I built this website using a MEAN stack which was the first time I had made a fully functional site using this stack. After finishing the project, I went back to it to add Bootstrap for the grid system and to add media queries to make it responsive for smart phones. I integrated the google maps API and autocomplete which was essential for this type of website.


![](/src/assets/images/indexPage.png)

####Approach / How it works

After registering on the site, the user is able to create poker games which are then listed on the games index page. The address of the user is turned into a latitude and longitude when they register so when it comes to hosting a game, they don't have to add their address again, it is automatically done and a map of their location is shown on the games index page and also on the show page for the game. A feature I added to the registration page was to check the database against the username they have chosen so as soon as they tab out of the username box, it searches through the database and if the username is already taken, it displays a message to let them know that the username already exists.

Users can then search through the list of available games, ask questions to the host of the game and then click a button to be added to the list of players already attending. The number of seats remaining is displayed on the index and show page for the game. If the user who posted the game has questions, they are able to reply and their answer is displayed underneath the question they are responding to, so far example if there was 3 questions on the page, each answer would sit underneath the corresponding question.


![](/src/assets/images/mobile.png)


#### Problems & Challenges

The main problem I had with this project was actually displaying a message to the user to let them know if their chosen username had already been taken before they submitted the form. I managed to integrate this small, but very useful feature using a jQuery form validation, but the documentation was unclear on how to set it up. After reading through more and more of the documentation and tweaking the code, I managed to get it up and running and was really pleased with the result. Feel free to check it out for yourself, one of the usernames already taken is 'PokerKing1985' so if you enter that when registering and then move on to the next input field the message will display.

After finishing this project, I returned to it to make it responsive on smart phones and completely changed the styling of the entire project. Feel free to have a look at my original repository for this project to see the difference.
