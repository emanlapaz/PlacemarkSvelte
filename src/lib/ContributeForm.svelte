<script>
  // @ts-nocheck
  
    import { onMount } from "svelte";
    import Coordinates from "./Coordinates.svelte";
    import { contributionService } from "../services/contribution-service";
  
    let placemarkName;
    let lat = 52.160858;
    let lng = -7.15242;
    let locationList = [];
    let selectedLocation= "";
    let placemarkCategories = ["Nature", "Food", "Sports", "History", "Accomodation","Health", "Education",];
    let selectedCategory = "";
    let description;
    let message = "PlaceMark Svelte";
    
    onMount(async () => {
		        locationList = await contributionService.getLocations();
	  });

    async function contribute() {
      if (selectedLocation && pplacemarkName && selectedCategory) {
                const locationNames = selectedLocation.split(",");
                const location = locationList.find((location) => location.town === locationNames[0] && location.county == locationNames[1]);
                const contribution = {
                        placemarkName: placemarkName,
                        lat: lat,
                        lng: lng,
                        description: description,
                        category: selectedCategory,
                        location: location._id
                };
                const success = await contributionService.contribute(contribution);
                if (!success) {
                  message = "Adding placemark not completed - some error occurred";
                  return;
                }
                message = `Thanks! You added ${placemarkName} in ${category.location}`;
        } else {
                message = "Please fill up all the forms";
      }
    }
  </script>
  
  <form on:submit|preventDefault={contribute}>
    <div class="field">
      <label class="label" for="placemarkName">Enter Name</label>
      <input bind:value={placemarkName} class="input" id="placemarkName" name="placemarkName" type="string" />
    </div>
    <div class="field">
      <label class="label" for="description">Enter Description</label>
      <input bind:value={description} class="input" id="description" name="description" type="string" />
    </div>
    <!--<div class="field">
      <label class="label" for="latitude">Enter Latitude</label>
      <input bind:value={lat} class="input" id="lat" name="lat" type="string" />
    </div>
    <div class="field">
      <label class="label" for="longitude">Enter Longitude</label>
      <input bind:value={lng} class="input" id="lng" name="lng" type="string" />
    </div>-->
    <Coordinates bind:lat={lat} bind:lng={lng}/>
    <div class="field">
		<div class="control">
			{#each placemarkCategories as category}
				<input bind:group={selectedCategory} class="radio" type="radio" value={category} /> {category}
			{/each}
		</div>
    <div class="field"><label class="label" for="location">Choose Location</label>
		<div class="select">
			<select bind:value={selectedLocation}>
				{#each locationList as location}
					<option>{location.town},{location.county}</option>
				{/each}
			</select>
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
  