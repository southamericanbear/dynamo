<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <UploadSection ref="uploadSection" />
      <MySongsDashboard />
    </div>
  </section>
</template>

<script>
import UploadSection from '@/components/UploadSection';
import MySongsDashboard from '@/components/MySongsDashboard';
import { songsCollection, auth } from '@/includes/firebase';

export default {
  name: 'manage',
  components: {
    UploadSection,
    MySongsDashboard,
  },
  async created() {
    const snapshot = await songsCollection
      .where('uid', '==', auth.currentUser.uid)
      .get();
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.uploadSection.cancelUploads();
    next();
  },
};
</script>
