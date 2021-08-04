<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <UploadSection />
      <MySongsDashboard />
    </div>
  </section>
</template>

<script>
import UploadSection from "@/components/UploadSection";
import MySongsDashboard from "@/components/MySongsDashboard";

export default {
  name: "manage",
  components: {
    UploadSection,
    MySongsDashboard,
  },
};
</script>
