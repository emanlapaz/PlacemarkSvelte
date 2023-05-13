<script>
  // @ts-nocheck
  
    import { onMount } from "svelte";
    import { placemarkService } from "../services/placemark-service";
  
    let placemarkName; //amount to placemarkName
    let latitude;
    let longitude;
    let category = ["Nature", "Historical Site", "Restaurants", "Tourist Attraction", "Sports"]; // add more category
    let description;
    let selectedCategory = ""; // from selected method
    let message = "PlaceMark Svelte"; // what to write here?
    //let candidateList = []; //user list?
    //let selectedCandidate = ""; //selected user??
  
    //let paymentMethods = ["Paypal", "Cash"];// payement method to category
    
  
    
  
    //onMount(async () => {
  //candidateList = await donationService.getCandidates();
    //});
  
    async function addPlacemark() { //donate to add placemark
      if (placemarkName && latitude && longitude && selectedCategory) {
       // const candidateNames = selectedCandidate.split(",");
        //const candidate = candidateList.find((candidate) => candidate.lastName == candidateNames[0] && candidate.firstName == candidateNames[1]);
        const addPlacemark = {
          placemarkName: placemarkName,
          latitude: latitude, // lat?
          longitude: longitude, // long?
          amount: amount,
          category: selectedCategory,
          description: description
          //candidate: candidate._id
        };
        const success = await placemarkService.addPlacemark(placemark);
        if (!success) {
          message = "Adding placemark not completed - some error occurred";
          return;
        }
        message = `Thanks! You added ${placemarkName} to the list`;
      } else {
        message = "Please add Placemark Name, location and description";
      }
    }
  </script>
  
  <form on:submit|preventDefault={addPlacemark}>
    <div class="field">
      <label class="label" for="placemarkName">Enter Name</label>
      <input bind:value={placemarkName} class="input" id="placemarkName" name="placemarkName" type="string" />
    </div>
    <div class="field">
      <label class="label" for="latitude">Enter Latitude</label>
      <input bind:value={latitude} class="input" id="latitude" name="latitude" type="number" />
    </div>
    <div class="field">
      <label class="label" for="longitude">Enter Longitude</label>
      <input bind:value={longitude} class="input" id="longitude" name="longitude" type="number" />
    </div>
    <div class="field">
      <label class="label" for="description">Enter Description</label>
      <input bind:value={description} class="input" id="description" name="description" type="string" />
    </div>
    <div class="field">
      <div class="control">
        {#each category as cat}
          <label class="radio">
            <input bind:group={selectedCategory} class="radio" type="radio" value={cat} />
            {cat}
          </label>
        {/each}
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-link is-light">Add PlaceMark</button>
      </div>
    </div>
    <div class="box">
      {message}
    </div>
  </form>
  