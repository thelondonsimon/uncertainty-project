<template>
  <div style="display:inline;">
    <b-icon v-if="val" class="ml-2" icon="check-circle" variant="success"></b-icon>
    <b-icon v-else-if="val === false" class="ml-2" icon="x-circle-fill" variant="danger"></b-icon>
  </div>
</template>

<script>

export default {
  name: 'BooleanIcon',
  props: ['val']
}
</script>
