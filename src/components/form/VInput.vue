<template>
   <div class="inputBox">
       <input type="text" :name="name" />
      <span>Phone number</span>
   </div>
</template>

<script setup>
const props = defineProps({
   type: {
      type: String,
      defaut: "text",
   },
   name: {
      type: String,
   },
   label: {
      type: String,
   },
});
console.log(props.label);
</script>

<style lang="scss" scoped>
.inputBox {
  position: relative;
  width: 250px;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: #1d2b3a;
    outline: none;
    color: #fff;
    font-size: 1em;
    transition: 0.5s;
  }

  span {
    position: absolute;
    left: 0;
    padding: 10px;
    pointer-events: none;
    font-size: 1em;
    color: rgba(255, 255, 255, 0.25);
    text-transform: uppercase;
    transition: 0.5s;
  }

  input { &:focus ~ span {
      color: #00dfc4;
      transform: translateX(10px) translateY(-7px);
      font-size: 0.65em;
      padding: 0 10px;
      background: #1d2b3a;
      border-left: 1px solid #00dfc4;
      border-right: 1px solid #00dfc4;
      letter-spacing: 0.2em;
    }

    &:valid, &:focus {
      border: 1px solid #00dfc4;
    }
  }
}

</style>
