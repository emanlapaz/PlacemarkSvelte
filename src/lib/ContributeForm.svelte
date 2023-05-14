<script>
  // @ts-nocheck
  
    import { onMount } from "svelte";
    import { contributionService } from "../services/contribution-service";
  
    let placemarkName;
    let lat;
    let lng;
    let categoryList = [];
    let selectedCategory= "";
    let description;
    let message = "PlaceMark Svelte";
    
    onMount(async () => {
		categoryList = await contributionService.getCategories();
	  });

    async function contribute() {
      if (placemarkName && lat && long&& selectedCategory) {
        const categoryNames = selectedCategory.split(",");
        const category = categoryList.find((category) => category.location == categoryNames[0] && category.type == categoryNames[1]);
        const contribution = {
          placemarkName: placemarkName,
          description: description,
          lat: lat, // latitutude
          lng: lng, // longitude
          category: category._id
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
    <div class="field">
      <label class="label" for="latitude">Enter Latitude</label>
      <input bind:value={lat} class="input" id="lat" name="lat" type="string" />
    </div>
    <div class="field">
      <label class="label" for="longitude">Enter Longitude</label>
      <input bind:value={lng} class="input" id="lng" name="lng" type="string" />
    </div>
    <div class="field">
      <div class="select">
        <select bind:value={selectedCategory}>
          {#each categoryList as category}
            <option>{category.type}</option>
          {/each}
        </select>
        <select bind:value={selectedCategory}>
          {#each categoryList as category}
            <option>{category.location}</option>
          {/each}
        </select>
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
  