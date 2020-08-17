import React, { useEffect, useState, useContext } from 'react'
import { Controller, Scene } from 'react-scrollmagic'
import { ApiContext } from './ApiContext'



const Artists = () => {

  const [artistsData, setArtistsData] = useState([])
  const [similarArtists, setSimilarArtists] = useState([])
  const token = useContext(ApiContext)
  const [key, setKey] = useState('')

  useEffect(() => {
    fetch('https://api.artsy.net/api/artists?cursor=100%3A5ee9c1c34ed9d50007d748b9&gene_id=4de93fa9c182420001004327', { headers: { 'X-XAPP-Token': token } })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        const newData = data._embedded.artists.map((artist) => {
          return { ...artist, showSimilarArtist: false }
        })
        setArtistsData(newData)
      })
  }, [token])

  function displaySimilar(event, buttonKey) {
    //* If buttonKey matches key, set similar artists to be an empty array (i.e display none)
    if (buttonKey === key) {
      setSimilarArtists([])
      //! We have the id of artist from clicking on button.
    } else {
      //* Fetching from url in button and taking response from url
      //* Setting id to equal button id (which is the original artist id)
      const id = event.target.id
      fetch(event.target.value, { headers: { 'X-XAPP-Token': `${ARTSY_TOKEN}` } })
        .then(resp => resp.json())
        .then(data => {
          //* Mapping through the data from the response and saving this mapped data to newSimilarArtists
          const newSimilarArtists = data._embedded.artists.map((similarArtist) => {
            //* Return an object with all of the similar artists the api gave with an additonal key which matches the artist id of button the user clicked on.
            return { ...similarArtist, originalArtistID: id }
            //! Creates a new array of objects with has the similar artist with the original artists' id.
          })
          //* Making a new array from both of our exisitng arrays.
          const combinedArtists = similarArtists.concat(newSimilarArtists)
          const result = []
          const artistExists = {}
          //* Going through new combined array for each artist, if artistExists doesn't have property of artist.id push it to results array.
          combinedArtists.forEach((artist) => {
            //!If the object has prop artist.id, it does nothing. 
            if (!artistExists.hasOwnProperty(artist.id)) {
              result.push(artist)
              //!If not, after we push to the array, we make it true so the artist can't be added to the result array again(case for duplication.
              artistExists[artist.id] = true
            }
          })
          setKey(buttonKey)
          //! Now similarArtists in state becomes all of the similar artists pushed to the result array by line 53.
          setSimilarArtists(result)
        })
    }
  }

  return <>
    <h1>RACIAL AND ETHNIC IDENTITY</h1>
    <div className="cardSection">
      <p>&quot;From its increased significance at the height of European colonialism to the foundations of Enlightenment-era pseudoscience, the concept of race has been used to categorize humans along the lines of shared characteristics in order to understand human difference. Racism, which sociologist Howard Winant defines as “that which creates or reproduces hierarchical social structures based on essentialized racial categories,” has fueled unthinkable violations of human life.&quot;</p>
      {artistsData.map((artist, index) => {
        return <div key={index}>
          <Controller>
            <Scene triggerHook={'onEnter'} classToggle="fadeInUp">
              <div className="artistCard">
                <h2 className="artistsName">{artist.name.toUpperCase()}</h2>
                <img src={artist._links.thumbnail.href} alt={artist.name} />
              </div>
            </Scene>
          </Controller>
          <div className="similarArtistContainer">
            {similarArtists.map((similarArtist) => {
              if (similarArtist.originalArtistID === artist.id) {
                return <div className="similarArtistCard">
                  <div> {similarArtist.name.toUpperCase()} </div>
                  <img src={similarArtist._links.thumbnail.href} alt={similarArtist.name} />
                </div>
              } else {
                return null
              }
            })}
          </div>
          <button className="button-2" key={index} id={artist.id} value={artist._links.similar_artists.href} onClick={() => displaySimilar(event, index)}>Similar Artists</button>
        </div>
      })}
    </div>
  </>
}


// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI1ZWU4YzAxOGFiMWRiZDAwMGY0YmYyYjIiLCJleHAiOjE1OTc0NzYwMDQsImlhdCI6MTU5Njg3MTIwNCwiYXVkIjoiNWVlOGMwMThhYjFkYmQwMDBmNGJmMmIyIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjVmMmU1MjI0MmQyY2Q1MDAwZGRmZDVmOSJ9.YUJp6M91Mzha3lYjfKxgXxp4fxQZAbgevW2tnCI6S8A'
export default Artists