<template>
  <v-navigation-drawer v-model="drawer">
    <v-list nav dense>
      <v-list-item-group v-model="group" active-class="">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Home
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
