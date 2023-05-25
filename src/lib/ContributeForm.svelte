<script lang="ts">
    import { contributionService } from "../services/contribution-service";
	  import type { Location } from "../services/contribution-types";
	  import { loggedInUser } from "../stores";
	  import Coordinates from "$lib/Coordinates.svelte";

	  export let locationList: Location[] = [];


    export let placemarkName = "";
    export let lat = 53.33;
    export let lng = -6.24;
    export let rating = 1;
    export let selectedLocation = "";
    export let placemarkCategories = ["Nature", "Food", "Sports", "History", "Accommodation", "Health", "Education"];
    export let selectedCategory = "";
    export let description = "";
    export let message = "PlaceMark Svelte";
    
    async function contribute() {
      if (selectedLocation && placemarkName && selectedCategory) {
                const locationNames = selectedLocation.split(",");
                const location = locationList.find((location) => location.town === locationNames[0] && location.county == locationNames[1]);
                if (location) {
                const contribution = {
                        placemarkName: placemarkName,
                        rating: rating,
                        lat: lat,
                        lng: lng,
                        description: description,
                        category: selectedCategory,
                        location: location,
                        contributor: $loggedInUser,
                        _id: ""
                };
                const success = await contributionService.contribute(contribution);
                if (!success) {
                  message = "Adding placemark not completed - some error occurred";
                  return;
                }
                message = `Thanks! You added ${placemarkName}`;
              }
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
      <label class="label" for="rating">Enter Rating</label>
      <input bind:value={rating} class="input" id="rating" name="rating" type="number" />
    </div>
    <div class="field">
      <label class="label" for="description">Enter Description</label>
      <input bind:value={description} class="input" id="description" name="description" type="string" />
    </div>
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
  