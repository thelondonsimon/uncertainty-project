<template>
  <div class="home">
    <b-overlay :show="loading" rounded="sm">
      <div v-if="loading == false">
        <div class="alert alert-secondary pt-2 pb-2" role="alert">
          <div class="container">
            <div class="row">
              <div class="col-8 pl-0">
                <router-link to="/">Home</router-link> &nbsp; / &nbsp;
                <span>{{this.RefEntity.data.label}}</span>
              </div>
              <div class="col text-right pr-0">
                <router-link :to="{ name: 'RefEntity', params: { RefEntityId: getPrevLinkId() }}">Prev</router-link> &nbsp; | &nbsp;
                <router-link :to="'/refentity/' + getNextLinkId()">Next</router-link>
              </div>
            </div>
          </div>
        </div>

        <hr class="mt-4">

        <h1 class="pb-2"><em>Who is {{this.getPrefix}} {{this.RefEntity.data.label}}?</em></h1>
          <b-card-group deck>
            <b-card v-for="r in this.RefEntity.Questions.data[0].Responses.data"
              :key="r.ref['@ref'].id"
              :header-bg-variant="platformToCardVariant(r.data.platform)"
              header-text-variant="white"
              :header="r.data.platform"
            >
              <b-card-text>
                <p class="mb-1"><span class="text-muted font-weight-bold">
                  Correctly Answered? </span>
                  <boolean-icon :val="r.data.correctlyAnswered"></boolean-icon>
                </p>
                <p class="mb-1"><span class="text-muted font-weight-bold">
                  Definitive Answer? <boolean-icon :val="r.data.definitiveResponse"></boolean-icon>
                </span></p>
                <p class="mb-1"><span class="text-muted font-weight-bold">
                  Geography of Answer</span>
                    <span class="ml-2 text-weight-light" v-if="r.data.geographyOfAnswer">{{r.data.geographyOfAnswer }}</span>
                    <span class="ml-2" v-else>Unknown</span>
                </p>
                <p class="mb-1"><span class="text-muted font-weight-bold">
                  Attribution</span>
                    <span class="ml-2 text-weight-light" v-if="r.data.attribution">{{r.data.attribution }}</span>
                    <span class="ml-2" v-else>Unknown</span>
                </p>
                <hr>
                <p>{{r.data.transcript}}</p>
                <hr>
                <b-img fluid :src="r.ScreenShots.data[0].data.url" />
              </b-card-text>
            </b-card>
          </b-card-group>
      </div>
    </b-overlay>
  </div>
</template>

<script>
const axios = require('axios')
import BooleanIcon from '../components/BooleanIcon.vue'
export default {
  name: 'RefEntity',
  components: { BooleanIcon},
  data() {
    return {
      loading: true,
      RefEntity: { data: { label: '', labelPrefix: '' }, Questions: { data: [{Responses: {data:[] } }]} }
    }
  },
  computed: {
    getPrefix() {
      const prefixesToIgnore = ['Mr','Mrs','Ms','The Honourable']
      return (prefixesToIgnore.indexOf(this.RefEntity.data.labelPrefix) >= 0) ? '' : this.RefEntity.data.labelPrefix + ' '
    }
  },
  methods: {
    async refreshRefEntity() {
      const response = await axios.get('/.netlify/functions/fauna-refentity/' + this.$route.params.RefEntityId)
      this.RefEntity = response.data
    },
    platformToCardHeader(platform) {
      const lookup = {'Alexa': 'Success', 'Google Assistant': 'Danger', 'Siri': 'Primary'}
      return lookup[platform]
    },
    platformToCardVariant(platform) {
      const lookup = {'Alexa': 'success', 'Google Assistant': 'danger', 'Siri': 'primary'}
      return lookup[platform]
    },
    getPrevLinkId() {
      let curIndex = 0
      for (let i = 0; i < this.$store.getters.allRefEntities.length; i++) {
        if (this.$store.getters.allRefEntities[i].ref['@ref'].id == this.$route.params.RefEntityId) {
          curIndex = i
        }
      }
      if (curIndex == 0) {
        return this.$store.getters.allRefEntities[this.$store.getters.allRefEntities.length - 1].ref['@ref'].id
      } else {
        return this.$store.getters.allRefEntities[curIndex - 1].ref['@ref'].id
      }
    },
    getNextLinkId() {
      let curIndex = 0
      for (let i = 0; i < this.$store.getters.allRefEntities.length; i++) {
        if (this.$store.getters.allRefEntities[i].ref['@ref'].id == this.$route.params.RefEntityId) {
          curIndex = i
        }
      }
      if (curIndex == this.$store.getters.allRefEntities.length - 1) {
        return this.$store.getters.allRefEntities[0].ref['@ref'].id
      } else {
        return this.$store.getters.allRefEntities[curIndex + 1].ref['@ref'].id
      }
    }
  },
  async created() {
    await this.refreshRefEntity()
    this.loading = false
  },
  watch: {
    '$route.params.RefEntityId': async function() {
      this.loading = true
      await this.refreshRefEntity()
      this.loading = false
    }
  }
}
</script>
