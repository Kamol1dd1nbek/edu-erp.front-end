<template>
   <div>
      <table v-if="!loading">
         <thead>
            <tr class="row100 head">
               <th v-for="(head, index) in header" :key="index">
                  {{ head.title }}
               </th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(item, i_index) in body" :key="i_index">
               <td v-for="(head, index) in header" :key="index">
                  <slot :name="`body_${head.value}`" :item="item">{{
                     item[head.value]
                  }}</slot>
               </td>
            </tr>
         </tbody>
      </table>
      <table v-else>
         <thead>
            <tr class="row100 head">
               <th v-for="(head, index) in header" :key="index">
                  {{ head.title }}
               </th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(item, i_index) in mockArray" :key="i_index">
               <td v-for="(head, index) in header" :key="index">
                  <slot :name="`body_${head.value}`" :item="item">
                     <el-skeleton style="width: 240px" :loading="true" animated>
                        <template #template>
                           <el-skeleton-item variant="h3" style="width: 100%" />
                        </template>
                     </el-skeleton>
                  </slot>
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script setup>
const props = defineProps({
   header: Array,
   body: {
      type: Array,
      default: [{ username: "" }, {}, {}, {}],
   },
   loading: Boolean,
});
const mockArray = [{}, {}, {}, {}, {}, {}];
</script>

<style lang="scss" scoped>
table {
   width: 100%;
   border-collapse: separate;
   border-spacing: 0;
   overflow-x: auto;
   thead {
      background-color: #12486b;
      th {
         border-top: 1px solid #e1eaed;
         padding: 10px 36px;
         font-size: 16px;
         font-weight: 800;
         color: #fff;
         font-weight: 500;
         font-size: 14px;
         text-transform: uppercase;
         height: 50px;
      }
   }
   tbody {
      tr {
         td {
            height: 50px;
            font-size: 15px;
            padding: 7px 3px;
            font-weight: 700;
            text-align: center;
            color: #065fd4;
         }
      }
      background: #f6fbff;
   }
}
table thead tr th:first-child {
   border-top-left-radius: 5px;
}
table thead tr th:last-child {
   border-top-right-radius: 5px;
}
table tbody tr:last-child td:last-child {
   border-bottom-right-radius: 5px;
}
table tbody tr:last-child td:first-child {
   border-bottom-left-radius: 5px;
}
</style>
