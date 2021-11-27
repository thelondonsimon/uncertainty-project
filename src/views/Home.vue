<template>
  <div>
    <h1>2021 Companions of the Order of Australia</h1>
    <table class="table table-hover">
      <thead>
          <tr>
              <th scope="col">Recipient</th>
              <th scope="col">Gender</th>
              <th scope="col">Field</th>
          </tr>
      </thead>
      <tbody>
        <tr
        v-for="entity in this.$store.getters.allRefEntities"
            :key="entity.ref['@ref'].id">
            <td><b-link :href="'/refentity/' + entity.ref['@ref'].id">{{entity.data.label}}</b-link></td>
            <td>{{entity.data.gender}}</td>
            <td>{{entity.data.field}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>
