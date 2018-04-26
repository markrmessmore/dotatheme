<template lang="html">
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-container>
            <v-layout row>
              <v-flex xs10 offset-xs1>
                <v-card color="secondary white--text" class="elevation-5">
                  <v-card-text>
                    <h3 class="display-1">What is this site all about?</h3>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <br>
            <v-layout row>
              <v-flex xs10 offset-xs1>
                <v-card class="elevation-5">
                  <v-card-text>
                    <h6 class="headline">So what random corner of the Internet did I end up in?</h6>
                    <br>
                    <p class="subheading">
                      Welcome to a facet of the <a href="http://www.welikedota.com/">WeLikeDota</a> Community; the Internet's <i>casual</i> Dota 2 podcast.
                      <br>
                      <br>
                      Essentially this site serves up our Theme Thursday community nights. On Thursdays we try to get some <b>5 vs. 5</b> or even <b>10 vs. 10</b> quirky matches with community members with picks being based around the themes you saw on our home page. Occasionally when there are not enough folks around we take our themes into an unranked match so that we can get appropriately pummeled by tryhards.
                      <br>
                      <br>
                      Interested in learning more about WeLike Dota? Click one of the links below!
                    </p>
                  </v-card-text>
                  <v-layout row text-xs-center>
                    <v-flex xs12>
                      <v-btn href="http://welikedota.com" large color="indigo" dark>
                        <v-icon left>fas fa-globe</v-icon>
                        WLD on the Web
                      </v-btn>
                      <v-btn href="https://itunes.apple.com/us/podcast/we-like-dota-podcasts/id799008929" large color="orange darken-3" dark>
                        <v-icon left>fas fa-podcast</v-icon>
                        WLD Podcast
                      </v-btn>
                      <v-btn href="https://discord.gg/0h2DOuBCUWs9XHZp" large color="deep-purple lighten-1" dark>
                        <v-icon left>fab fa-discord</v-icon>
                        WLD Discord
                      </v-btn>
                      <v-btn href="https://twitter.com/welikedota" large color="blue lighten-2" dark>
                        <v-icon left>fab fa-twitter</v-icon>
                        WLD Twitter
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
