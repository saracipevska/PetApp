// //
// // import { Component } from '@angular/core';
// // import { FormsModule } from '@angular/forms';
// // import { NgIf, NgFor } from '@angular/common';
// // import * as L from 'leaflet';
// //
// // @Component({
// //   selector: 'app-vet-appointment',
// //   standalone: true,
// //   imports: [FormsModule, NgIf, NgFor],
// //   templateUrl: './veterinarian.html',
// //   styleUrls: ['./veterinarian.css']
// // })
// // export class Veterinarian {
// //
// //   submitted = false;
// //   selectedVet: any = null;
// //
// //   clinicName = ' Veterinary Clinic';
// //
// //   vets = [
// //     {
// //       id: 1,
// //       name: 'Dr. Marko Stojanov',
// //       speciality: 'Small Animals',
// //       description: 'Expert in dogs and cats with 8 years experience.',
// //       rating: 4.9,
// //       image: 'assets/images/vet1.webp'
// //     },
// //     {
// //       id: 2,
// //       name: 'Dr. Ana Petrova',
// //       speciality: 'Surgery',
// //       description: 'Emergency & surgical specialist.',
// //       rating: 4.8,
// //       image: 'assets/images/vet2.webp'
// //     },
// //     {
// //       id: 3,
// //       name: 'Dr. Elena Dimitrova',
// //       speciality: 'Dermatology',
// //       description: 'Skin and allergy treatments for pets.',
// //       rating: 4.7,
// //       image: 'assets/images/vet3.webp'
// //     }
// //   ];
// //
// //   appointmentForm = {
// //     ownerName: '',
// //     petName: '',
// //     petType: 'Dog',
// //     service: 'Check-up',
// //     date: '',
// //     time: '',
// //     contact: ''
// //   };
// //
// //   selectVet(vet: any) {
// //     this.selectedVet = vet;
// //   }
// //
// //   onSubmit() {
// //     if (!this.appointmentForm.ownerName || !this.appointmentForm.date) {
// //       alert('Please fill required fields!');
// //       return;
// //     }
// //
// //     console.log({
// //       clinic: this.clinicName,
// //       vet: this.selectedVet,
// //       ...this.appointmentForm
// //     });
// //
// //     this.submitted = true;
// //
// //     this.appointmentForm = {
// //       ownerName: '',
// //       petName: '',
// //       petType: 'Dog',
// //       service: 'Check-up',
// //       date: '',
// //       time: '',
// //       contact: ''
// //     };
// //
// //     this.selectedVet = null;
// //   }
// //   //
// //   // ngOnInit(){
// //   //   const map=L.map('map').setView([41.9981, 21.4254], 13);
// //   //
// //   //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //   //     attribution: '© OpenStreetMap'
// //   //   }).addTo(map);
// //   //
// //   //   L.marker([41.9981, 21.4254]).addTo(map)
// //   //     .bindPopup('Skopje')
// //   //     .openPopup();
// //   // }
// //   ngOnInit() {
// //     const map = L.map('map').setView([41.9981, 21.4254], 13);
// //
// //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //       attribution: '© OpenStreetMap'
// //     }).addTo(map);
// //
// //     // 🔴 ЦРВЕНА ИКОНА (emergency)
// //     const redIcon = L.icon({
// //       iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
// //       shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
// //       iconSize: [25, 41],
// //       iconAnchor: [12, 41],
// //       popupAnchor: [1, -34],
// //     });
// //
// //     // 🐾 Вет служби
// //     const vets = [
// //       { name: 'Vet Service 1', coords: [41.9995, 21.4314], phone: '070-123-456', emergency: false },
// //       { name: 'Vet Service 2', coords: [41.9950, 21.4200], phone: '071-987-654', emergency: false },
// //       { name: 'Vet Service 3', coords: [42.0020, 21.4100], phone: '075-555-222', emergency: false },
// //       { name: 'Emergency Vet 24/7', coords: [41.9970, 21.4350], phone: '078-111-999', emergency: true }
// //     ];
// //
// //     vets.forEach(vet => {
// //       L.marker(
// //         vet.coords as [number, number],
// //         vet.emergency ? { icon: redIcon } : {} // 🔥 ако е emergency → црвено
// //       )
// //       .addTo(map)
// //       .bindPopup(`
// //         <b>${vet.name}</b><br/>
// //         📞 <a href="tel:${vet.phone}">${vet.phone}</a>
// //         ${vet.emergency ? '<br/>🚨 <b>EMERGENCY 24/7</b>' : ''}
// //       `);
// //     });
// //
// //     const blueIcon = L.icon({
// //       iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
// //       shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
// //       iconSize: [25, 41],
// //       iconAnchor: [12, 41],
// //       popupAnchor: [1, -34],
// //     });
// //   }
// //
// // }
//
//
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { NgIf, NgFor } from '@angular/common';
// import * as L from 'leaflet';
//
// @Component({
//   selector: 'app-vet-appointment',
//   standalone: true,
//   imports: [FormsModule, NgIf, NgFor],
//   templateUrl: './veterinarian.html',
//   styleUrls: ['./veterinarian.css']
// })
// export class Veterinarian implements OnInit {
//
//   submitted = false;
//   selectedVet: any = null;
//
//   clinicName = 'Veterinary Clinic';
//
//   vets = [
//     {
//       id: 1,
//       name: 'Dr. Marko Stojanov',
//       speciality: 'Small Animals',
//       description: 'Expert in dogs and cats with 8 years experience.',
//       rating: 4.9,
//       image: 'assets/images/vet1.webp'
//     },
//     {
//       id: 2,
//       name: 'Dr. Ana Petrova',
//       speciality: 'Surgery',
//       description: 'Emergency & surgical specialist.',
//       rating: 4.8,
//       image: 'assets/images/vet2.webp'
//     },
//     {
//       id: 3,
//       name: 'Dr. Elena Dimitrova',
//       speciality: 'Dermatology',
//       description: 'Skin and allergy treatments for pets.',
//       rating: 4.7,
//       image: 'assets/images/vet3.webp'
//     }
//   ];
//
//   appointmentForm = {
//     ownerName: '',
//     petName: '',
//     petType: 'Dog',
//     service: 'Check-up',
//     date: '',
//     time: '',
//     contact: ''
//   };
//
//   selectVet(vet: any) {
//     this.selectedVet = vet;
//   }
//
//   onSubmit() {
//     if (!this.appointmentForm.ownerName || !this.appointmentForm.date) {
//       alert('Please fill required fields!');
//       return;
//     }
//
//     console.log({
//       clinic: this.clinicName,
//       vet: this.selectedVet,
//       ...this.appointmentForm
//     });
//
//     this.submitted = true;
//
//     this.appointmentForm = {
//       ownerName: '',
//       petName: '',
//       petType: 'Dog',
//       service: 'Check-up',
//       date: '',
//       time: '',
//       contact: ''
//     };
//
//     this.selectedVet = null;
//   }
//
//   ngOnInit() {
//     const map = L.map('map').setView([41.9981, 21.4254], 13);
//
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap'
//     }).addTo(map);
//
//     // 🔵 СИНА ИКОНА (fix за Angular)
//     const blueIcon = L.icon({
//       iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//       shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
//       iconSize: [25, 41],
//       iconAnchor: [12, 41],
//       popupAnchor: [1, -34],
//     });
//
//     // 🔴 ЦРВЕНА ИКОНА (emergency)
//     const redIcon = L.icon({
//       iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
//       shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
//       iconSize: [25, 41],
//       iconAnchor: [12, 41],
//       popupAnchor: [1, -34],
//     });
//
//     // 🐾 Вет служби
//     const vetLocations = [
//       { name: 'Vet Service 1', coords: [41.9995, 21.4314], phone: '070-123-456', emergency: false },
//       { name: 'Vet Service 2', coords: [41.9950, 21.4200], phone: '071-987-654', emergency: false },
//       { name: 'Vet Service 3', coords: [42.0020, 21.4100], phone: '075-555-222', emergency: false },
//       { name: 'Emergency Vet 24/7', coords: [41.9970, 21.4350], phone: '078-111-999', emergency: true }
//     ];
//
//     vetLocations.forEach(vet => {
//       L.marker(
//         vet.coords as [number, number],
//         vet.emergency ? { icon: redIcon } : { icon: blueIcon }
//       )
//         .addTo(map)
//         .bindPopup(`
//         <b>${vet.name}</b><br/>
//         📞 <a href="tel:${vet.phone}">${vet.phone}</a>
//         ${vet.emergency ? '<br/>🚨 <b>EMERGENCY 24/7</b>' : ''}
//       `);
//     });
//   }
//
//
// }


import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-vet-appointment',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './veterinarian.html',
  styleUrls: ['./veterinarian.css']
})
export class Veterinarian implements OnInit {

  submitted = false;
  selectedVet: any = null;

  clinicName = 'Veterinary Clinic';

  appointmentForm = {
    ownerName: '',
    petName: '',
    petType: 'Dog',
    service: 'Check-up',
    date: '',
    time: '',
    contact: ''
  };

  vets = [
    {
      id: 1,
      name: 'Dr. Marko Stojanov',
      speciality: 'Small Animals',
      description: 'Expert in dogs and cats with 8 years experience.',
      rating: 4.9,
      image: 'assets/images/vet1.webp'
    },
    {
      id: 2,
      name: 'Dr. Ana Petrova',
      speciality: 'Surgery',
      description: 'Emergency & surgical specialist.',
      rating: 4.8,
      image: 'assets/images/vet2.webp'
    },
    {
      id: 3,
      name: 'Dr. Elena Dimitrova',
      speciality: 'Dermatology',
      description: 'Skin and allergy treatments for pets.',
      rating: 4.7,
      image: 'assets/images/vet3.webp'
    }
  ];

  selectVet(vet: any) {
    this.selectedVet = vet;
  }

  onSubmit() {
    if (!this.appointmentForm.ownerName || !this.appointmentForm.date) {
      alert('Please fill required fields!');
      return;
    }

    console.log({
      clinic: this.clinicName,
      vet: this.selectedVet,
      ...this.appointmentForm
    });

    this.submitted = true;

    setTimeout(() => {
      this.submitted = false;
    }, 4000);

    this.appointmentForm = {
      ownerName: '',
      petName: '',
      petType: 'Dog',
      service: 'Check-up',
      date: '',
      time: '',
      contact: ''
    };

    this.selectedVet = null;
  }

  ngOnInit(): void {

    const map = L.map('map').setView([41.9981, 21.4254], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // 🔵 BLUE ICON (default vets)
    const blueIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    // 🔴 RED ICON (emergency)
    const redIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    const vetLocations = [
      {
        name: 'Vet Service 1',
        coords: [41.9995, 21.4314],
        phone: '070-123-456',
        emergency: false
      },
      {
        name: 'Vet Service 2',
        coords: [41.9950, 21.4200],
        phone: '071-987-654',
        emergency: false
      },
      {
        name: 'Vet Service 3',
        coords: [42.0020, 21.4100],
        phone: '075-555-222',
        emergency: false
      },
      {
        name: 'Emergency Vet 24/7',
        coords: [41.9970, 21.4350],
        phone: '078-111-999',
        emergency: true
      }
    ];

    vetLocations.forEach(vet => {
      L.marker(
        vet.coords as [number, number],
        { icon: vet.emergency ? redIcon : blueIcon }
      )
        .addTo(map)
        .bindPopup(`
          <b>${vet.name}</b><br/>
          📞 <a href="tel:${vet.phone}">${vet.phone}</a>
          ${vet.emergency ? '<br/>🚨 <b>EMERGENCY 24/7</b>' : ''}
        `);
    });
  }
}
