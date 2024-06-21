<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Anime List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="6" size-md="3" v-for="anime in animes" :key="anime.mal_id">
            <ion-card>
              <img :src="anime.images.jpg.image_url" :alt="anime.title" />
              <ion-card-header>
                <ion-card-title>{{ anime.title }}</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      <div class="pagination">
        <ion-button @click="prevPage" :disabled="page === 1">Previous</ion-button>
        <span>Page {{ page }}</span>
        <ion-button @click="nextPage">Next</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import AnimeService from '@/services/AnimeService';

export default defineComponent({
  name: 'HomePage',
  setup() {
    const animes = ref<any[]>([]);
    const page = ref(1);

    const loadAnimes = async () => {
      try {
        const newAnimes = await AnimeService.getAnimes(page.value);
        animes.value = newAnimes; // Replace current animes with the new ones for the current page
      } catch (error) {
        console.error('Error fetching animes:', error);
      }
    };

    const nextPage = () => {
      page.value += 1;
      loadAnimes();
    };

    const prevPage = () => {
      if (page.value > 1) {
        page.value -= 1;
        loadAnimes();
      }
    };

    onMounted(() => {
      loadAnimes();
    });

    return {
      animes,
      page,
      nextPage,
      prevPage
    };
  }
});
</script>

<style scoped>
ion-card {
  text-align: center;
}

ion-card img {
  width: 100%;
  height: auto;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.pagination span {
  margin: 0 10px;
}
</style>
