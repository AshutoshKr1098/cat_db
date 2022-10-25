# About the project

This project is part of assignment given by Zappyride.com. Here we have built a cute cat project which has following functionalities:

a. When application loads, a card is displayed having content such as cat image, cat tags and cat description.
Cat Image is getting fetched from API : https://cataas.com/
Cat Description is getting fetched from API :https://catfact.ninja/fact

b. We have a smooth skeleton effect taking place till the time our card loads the content from API.

c. If user clicks anywhere on the card, a modal opens which displays a cute Cat Gif by hitting the endpoint :https://cataas.com/cat/gif/says/:text where :/text is replaced by the description of card.

d. An input search bar is also shown on UI. User can enter any valid input tag and the application fetches the cat details corresponding to those tag.

e. Finally if a user types an invalid tagname, it is validated against the set of tags that the Cataas.com exposes. So incase there is an invalid scenario, user is shown a Gif taken from endpoint : https://http.cat/ and also asked to refresh the application.

## Run Locally

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
