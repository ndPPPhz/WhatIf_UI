<template>
<div style="width: 100%; margin: auto;" class="container">
  <div>
    <h2> Genera una classifica random </h2>
    <div class="card-group">
      <div v-for="value in leghe" v-bind:key="value.id" class="card border" style="background-color: rgba(245, 245, 245, 0.4);">
          <div class="card-body">
            <h5 class="card-title mb-4">{{ value.nome }}</h5>
            <div class="container">
            <div class="card-text">
                <div class='row g-2 mb-4' v-for="(campionati) in value.campionati" v-bind:key="campionati.id">
                <div class="col align-items-center">
                  <label>{{ campionati.nome }}</label>
                  </div>
                  <div class="col">
                <button type="button" v-on:click="selected" :value="campionati.id" class="btn btn-primary">Seleziona</button>
                </div>
                </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { BASE_URL } from '@/variables.js'

export default {
  data() {
    return {
        leghe: null
    }
  },
  mounted() {
    this.fetchLeghe()
  },
  methods: {
    fetchLeghe: async function() {
        const response = await fetch(`${BASE_URL}/leghe`, {
            credentials: 'include',
            method: 'GET'
        })
        if (response.ok) {
            const fetchedData = await response.json()
            this.leghe = fetchedData
        } else {
            alert('Please login first!')
        }
    },
    selected: function(event) {
      const selectedLega = this.leghe.find((lega) => {
        const selectedCampionato = lega.campionati.find((campionato) => {
          return campionato.id == event.target.value
        })
        return (typeof selectedCampionato === 'undefined') ? undefined : lega
      })
      this.$router.push(`user/${selectedLega.id}/${event.target.value}`)
    }
  }
}
</script>