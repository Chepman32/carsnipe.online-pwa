// Image processing utilities for car images
// This file handles the processing of car images from src/assets/out

// Complete list of all PNG files in src/assets/out (687 files)
export const ALL_CAR_FILES = [
  "AMC Hurst SC_Rambler 1969.png",
  "Abarth 124 Spider 2019.png",
  "Acura Integra Type S 2023.png",
  "Acura NSX 2017..png",
  "Acura RDX 2022.png",
  "Acura ZDX 2024 EV.png",
  "Alfa Romeo 4C 2015.png",
  "Alfa Romeo 8C Competizione 2010.png",
  "Alfa Romeo GTV6 1983.png",
  "Alfa Romeo GTV6 1987.png",
  "Alpine A110 2017.png",
  "Alpine A290 2025.png",
  "Ariel Atom 2015.png",
  "Aston Martin DB9 2004.png",
  "Aston Martin DB9 2005.png",
  "Aston Martin DB9 2017.png",
  "Aston Martin DBS 2010.png",
  "Aston Martin DBS Superleggera 2019.png",
  "Aston Martin Rapide AMR 2019.png",
  "Aston Martin V12 Vanquish 2002.png",
  "Aston Martin V12 Vantage S 2015.png",
  "Aston Martin V8 Vantage 2012.png",
  "Aston Martin Valhalla 2024.png",
  "Aston Martin Valkyrie 2022.png",
  "Aston Martin Vanquish 2013.png",
  "Aston Martin Victor 2020.png",
  "Audi Q5 2023.png",
  "Audi Q8 2019.png",
  "Audi R8 2008.png",
  "Audi R8 V10 2013.png",
  "Audi R8_ Turquoise and Orange Beauty.png",
  "Audi RS 3 Sportback Priekinis Vaizdas.png",
  "Audi RS Q8 на белом фоне.png",
  "Audi RS3 2022.png",
  "Audi RS5 - Raudonas Grožis.png",
  "Audi RS5 2012.png",
  "Audi RS5 2013.png",
  "Audi RS6 Avant 2015.png",
  "Audi RS6 Avant в ярко-синем цвете.png",
  "Audi RS7 Sportback oranžinė spindesys.png",
  "Audi TT 2017.png",
  "Audi TTS 2019.png",
  "Audi e-tron GT 2022.png",
  "Aukso geltonas McLaren sportinis automobilis.png",
  "Aukso spalvos Honda Odyssey.png",
  "Austin A30 1952.png",
  "BAC Mono 2011.png",
  "BMW 324d (E30).png",
  "BMW 330i 2022.png",
  "BMW 4 Series Convertible 2022.png",
  "BMW 528i E12.png",
  "BMW Alpina B3 Bi-Turbo 2010.png",
  "BMW Alpina B8 2021.png",
  "BMW E46 M3 CSL 2003.png",
  "BMW M1 1978.png",
  "BMW M240i 2016.png",
  "BMW M3 2014.png",
  "BMW M3 2015.png",
  "BMW M3 E46 2004.png",
  "BMW M3 Touring 2023.png",
  "BMW M4 2015.png",
  "BMW M4 CSL 2022.png",
  "BMW M4 F82 2016.png",
  "BMW M4 GTS 2016.png",
  "BMW M440i Coupe 2021.png",
  "BMW M5 2013.png",
  "BMW M5 2014.png",
  "BMW M5 F90 2021.png",
  "BMW M5 Touring E61 2009.png",
  "BMW M6 Gran Coupe 2016.png",
  "BMW X3 E83 2004.png",
  "BMW X4 F26 2015.png",
  "BMW X5 G05 2019.png",
  "BMW XM 2023.png",
  "BMW Z3 1998.png",
  "BMW Z4 2013.png",
  "BMW Z4 2020.png",
  "BMW Z4 M Coupe 2006.png",
  "BMW Z8 2001.png",
  "BMW i7 M70 2024.png",
  "BMW i8 2015.png",
  "Baltas Abarth 124 Spider Kabriolet.png",
  "Baltas Mitsubishi Lancer Evolution.png",
  "Baltasis Porsche Taycan Turbo GT.png",
  "Bentley Azure 2009.png",
  "Bentley Bentayga Speed 2021.png",
  "Bentley Continental 2007.png",
  "Bentley Continental GT 2008.png",
  "Bentley Flying Spur 2020.png",
  "Bentley Mulliner Bacalar 2020.png",
  "Bentley Mulsanne Speed 2018.png",
  "Bollinger B1 2017.png",
  "Brabus G 700 2022.png",
  "Bugatti Centodieci 2022.png",
  "Bugatti Divo 2021.png",
  "Bugatti La Voiture Noire 2021.png",
  "Bugatti Mistral 2022.png",
  "Bugatti W16 Mistral 2022.png",
  "Buick Grand National 1984.png",
  "CT5-V Blackwing 2026.png",
  "CX-70.png",
  "Cadillac CT5-V Blackwing 2022.png",
  "Cadillac CTS-V 2016.png",
  "Cadillac Escalade 2023.png",
  "Cadillac Lyriq 2023.png",
  "Caterham Seven 2011.png",
  "Caterham Seven 2015.png",
  "Charger 1969.png",
  "Chery Tiggo 8 2024.png",
  "Chevrolet Astro Van 1994.png",
  "Chevrolet Aveo 2012.png",
  "Chevrolet Camaro 1982.png",
  "Chevrolet Camaro SS 2010.png",
  "Chevrolet Camaro ZL1 1LE в 2021.png",
  "Chevrolet Camaro ZL1 2018.png",
  "Chevrolet Camaro ZL1 Hennessey 2017.png",
  "Chevrolet Colorado 2017.png",
  "Chevrolet Corvette (C6) 2012.png",
  "Chevrolet Corvette C2 1963.png",
  "Chevrolet Corvette C5 2004.png",
  "Chevrolet Corvette E-Ray 2024.png",
  "Chevrolet Corvette E-Ray in Red.png",
  "Chevrolet Corvette Stingray 1969.png",
  "Chevrolet Corvette Stingray C7 2019.png",
  "Chevrolet Corvette Z06 2003.png",
  "Chevrolet Corvette Z06 2008.png",
  "Chevrolet Corvette Z06 2015.png",
  "Chevrolet Corvette ZR1 2009.png",
  "Chevrolet Corvette ZR1 2023.png",
  "Chevrolet Cruze 2014.png",
  "Chevrolet Equinox EV 2024.png",
  "Chevrolet Express Cargo Van 2020.png",
  "Chevrolet Monte Carlo SS 1995.png",
  "Chevrolet Silverado 1500 1990.png",
  "Chevrolet Silverado 1500 LT Double Cab 2014.png",
  "Chevrolet Silverado 2022.png",
  "Chevrolet Silverado EV 2024.png",
  "Chevrolet Spark 1LT Hatchback 2020.png",
  "Chevrolet Suburban 1935.png",
  "Chevrolet Suburban 2025.png",
  "Chevrolet Tahoe 1992.png",
  "Chevrolet Trax 2019.png",
  "Chevrolet Volt 2014.png",
  "Chrysler 300 Hurst 1970.png",
  "Chrysler 300 S 2019.png",
  "Chrysler LeBaron 1984.png",
  "Chrysler Voyager 1996.png",
  "Citroën 2CV 1948.png",
  "Citroën BX 1984.png",
  "Citroën Berlingo 1996.png",
  "Citroën Berlingo 2002.png",
  "Citroën C5 Aircross 2018.png",
  "Citroën DS3 2013.png",
  "Citroën Jumper 2001.png",
  "Citroën Jumper 2002.png",
  "Citroën Jumpy 2009.png",
  "Citroën SpaceTourer 2018.png",
  "Conquest Knight XV 2008.png",
  "Czinger 21C 2023.png",
  "DS 3 Performance 2016.png",
  "DS 3 Performance 2017.png",
  "Daihatsu Charade G11 1977.png",
  "Daihatsu Copen 2002.png",
  "De Tomaso P72 2020.png",
  "De Tomaso Pantera 1971.png",
  "De Tomaso Pantera 1973.png",
  "De Tomaso Pantera 2020.png",
  "Delage D12 2023.png",
  "Dodge Caravan 1987.png",
  "Dodge Caravan 1989.png",
  "Dodge Challenger R_T 2019.png",
  "Dodge Challenger SRT 2021.png",
  "Dodge Challenger SRT Hellcat 2020.png",
  "Dodge Charger 1966.png",
  "Dodge Charger 2023.png",
  "Dodge Charger R_T 1969.png",
  "Dodge Charger SRT 2023.png",
  "Dodge Charger SRT Hellcat Widebody 2021.png",
  "Dodge Charger Scat Pack 2023.png",
  "Dodge Dakota 1997.png",
  "Dodge Demon 340.png",
  "Dodge Hornet GT Plus 2023.png",
  "Dodge Viper SRT 2003.png",
  "Dodge Viper SRT-10 ACR 2008.png",
  "F-150 2018.png",
  "Ferrari 296 GTS 2022.png",
  "Ferrari 328 GTS 1985.png",
  "Ferrari 360 Challenge Stradale.png",
  "Ferrari 458 Speciale 2013.png",
  "Ferrari 458 Spider 2011.png",
  "Ferrari 488 GTB 2015.png",
  "Ferrari 488 Pista 2018.png",
  "Ferrari 488 Spider 2018.png",
  "Ferrari 575M Maranello 2002.png",
  "Ferrari 599 GTB 2006.png",
  "Ferrari 599 GTB Fiorano 2007.png",
  "Ferrari 612 Scaglietti 2008.png",
  "Ferrari 812 GTS 2020.png",
  "Ferrari 812 Superfast 2017.png",
  "Ferrari California 2011.png",
  "Ferrari California T 2015.png",
  "Ferrari Enzo 2002.png",
  "Ferrari F12 2015 .png",
  "Ferrari F430 Scuderia 2007.png",
  "Ferrari F430 Spider 2007.png",
  "Ferrari F8 Spider 2020.png",
  "Ferrari F8 Tributo 2020.png",
  "Ferrari FF 2012.png",
  "Ferrari GTC4Lusso.png",
  "Ferrari LaFerrari 2013.png",
  "Ferrari Monza SP2 2020.png",
  "Ferrari Portofino 2021.png",
  "Ferrari Portofino M 2021.png",
  "Ferrari Purosangue 2023.png",
  "Ferrari Roma 2023.png",
  "Ferrari Roma Spider 2021.png",
  "Ferrari SF90 Spider 2021.png",
  "Fiat 1100:103 1954.png",
  "Fiat 500 1957.png",
  "Fiat 500X 2018.png",
  "Fiat 600 1957.png",
  "Fiat Ducato 1999.png",
  "Fiat Ducato 2006.png",
  "Fiat Panda Van 2004.png",
  "Fiat Scudo 1995.png",
  "Fiat Uno 1981.png",
  "Fiat Uno 1983.png",
  "Fisker Karma 2012.png",
  "Fisker Ocean 2022.png",
  "Ford Bronco 1966.png",
  "Ford Bronco 2021.png",
  "Ford Bronco 2022.png",
  "Ford Bronco DeBerti Design 2021.png",
  "Ford Econoline 1992.png",
  "Ford Econoline E-150 1992.png",
  "Ford Escort Mk3 1987.png",
  "Ford F-150 1994.png",
  "Ford F-150 Lightning Electric Truck 2025.png",
  "Ford Falcon XR8 Sprint 2008.png",
  "Ford Fiesta ST 2014.png",
  "Ford Focus 2015.png",
  "Ford Focus RS 2009.png",
  "Ford Focus ST 2015.png",
  "Ford Focus ST 2018.png",
  "Ford Focus ST, 2018.png",
  "Ford GT 2005.png",
  "Ford GT 2017.png",
  "Ford Maverick 2022.png",
  "Ford Mustang Bullitt 2019.png",
  "Ford Mustang Dark Horse 2024.png",
  "Ford Mustang GTD 2024.png",
  "Ford Mustang Mach 1 2021.png",
  "Ford Mustang Mach 1 2022.png",
  "Ford Mustang SVO 1984.png",
  "Ford Mustang Shelby GT500 2013.png",
  "Ford Mustang Shelby GT500 2020.png",
  "Ford Prefect 1953.png",
  "Ford Ranger 2019.png",
  "Ford Shelby GT 2007.png",
  "Ford Shelby GT500 1967.png",
  "Ford Shelby GT500 2007.png",
  "Ford Shelby GT500 2010.png",
  "Ford Torino Talladega 1969.png",
  "Ford Transit 2000.png",
  "Ford Transit Connect 2010.png",
  "GMC Canyon 2015.png",
  "GMC Safari 1985.png",
  "GMC Savana 2010.png",
  "GMC Savana Cargo Van 2003.png",
  "GMC Sierra 2019.png",
  "GMC Yukon 1993.png",
  "GMC Yukon 1995.png",
  "Geely Boyue Proton X70 2016.png",
  "Gelber Chevrolet Corvette C1 1953.png",
  "Gelber Chevrolet Corvette C8 2020.png",
  "Genesis G70 3.3T Sport 2022.png",
  "Genesis G80 Sport 2022.png",
  "Genesis GV60 2022.png",
  "Genesis GV60.png",
  "Genesis X Speedium Coupe 2022.png",
  "Hennessey Venom F5 2021.png",
  "Hillman Minx 1951.png",
  "Hispano Suiza Carmen 2020.png",
  "Holden Commodore SS 2016.png",
  "Holden Commodore VF SS V Redline 2014.png",
  "Holden HSV GTS 2015.png",
  "Honda Accord Coupe 1983.png",
  "Honda Accord Euro R 2009.png",
  "Honda CR-X 1986.png",
  "Honda CR-Z 2013.png",
  "Honda Civic 2022.png",
  "Honda Civic Type R 2023.png",
  "Honda Legend 2012.png",
  "Honda Odyssey 1995.png",
  "Honda Odyssey 2011.png",
  "Honda Passport 1995.png",
  "Honda Pilot.png",
  "Honda Prelude 2001.png",
  "Honda Ridgeline 2019.png",
  "Honda S2000 2001.png",
  "Honda S2000 2009.png",
  "Honda S660 2015.png",
  "Honda Stepwgn 1996.png",
  "Honda e 2020.png",
  "Hummer EV 2023.png",
  "Hummer H1 1992.png",
  "Hyundai Elantra 2023.png",
  "Hyundai Elantra N 2022.png",
  "Hyundai H-1 (Starex) 1999.png",
  "Hyundai Ioniq 7 2024.png",
  "Hyundai Kona N 2022.png",
  "Hyundai Veloster N 2021.png",
  "Hyundai Veloster N 2022.png",
  "INKAS armored truck 2023.png",
  "Infiniti Q60 Red Sport 400 2017.png",
  "Infiniti QX60 2022.png",
  "Infiniti QX80 2022.png",
  "Isuzu MU-X 2013.png",
  "Jaguar F-Type 2018.png",
  "Jaguar F-Type SVR 2016.png",
  "Jaguar F-Type SVR 2017.png",
  "Jaguar XK8 1997.png",
  "Jaguar XK8 1998.png",
  "Jaguar XKR 2005.png",
  "Jaguar XKR-S 2014.png",
  "Jeep Cherokee 1974.png",
  "Jeep Gladiator 2020.png",
  "Jeep Wagoneer S 2024.png",
  "Jeep Wrangler.png",
  "KTM X-Bow R 2011.png",
  "Karlmann King Phantom 2018.png",
  "Kia Carnival 1999.png",
  "Kia EV6 GT 2022.png",
  "Kia Forte 2023.png",
  "Koenigsegg Agera RS 2015.png",
  "Koenigsegg Gemera 2024.png",
  "Koenigsegg Jesko 2019.png",
  "Koenigsegg Jesko Absolut 2020.png",
  "Koenigsegg One_1.png",
  "Koenigsegg Regera 2016.png",
  "Lada 2101 1970.png",
  "Lada 2107 1982.png",
  "Lamborghini Aventador 2011.png",
  "Lamborghini Aventador 2012.png",
  "Lamborghini Aventador S Coupe 2021.png",
  "Lamborghini Aventador SV 2011.png",
  "Lamborghini Aventador SV 2015.png",
  "Lamborghini Aventador Ultimae 2021.png",
  "Lamborghini Centenario 2016.png",
  "Lamborghini Countach LPI 800-4 2021.png",
  "Lamborghini Diablo 1990.png",
  "Lamborghini Essenza SCV12 2020.png",
  "Lamborghini Gallardo 2003.png",
  "Lamborghini Gallardo 2005.png",
  "Lamborghini Gallardo LP 570-4 SuperLeggera 2010.png",
  "Lamborghini Huracan 2014.png",
  "Lamborghini Huracan LP610-4 2015.png",
  "Lamborghini Huracán 2014.png",
  "Lamborghini Huracán 2015.png",
  "Lamborghini Huracán EVO 2019.png",
  "Lamborghini Huracán STO 2020.png",
  "Lamborghini Murciélago 2001.png",
  "Lamborghini Murciélago 2006.png",
  "Lamborghini Revuelto 2024.png",
  "Lamborghini Sian 2019.png",
  "Lamborghini Urus 2019.png",
  "Lamborghini Veneno 2013.png",
  "Lancia 037 Stradale 1982.png",
  "Lancia Delta Integrale 1991.png",
  "Land Rover Defender 110 2015.png",
  "Land Rover Defender Works V8 X Tech.png",
  "Land Rover Discovery 1996.png",
  "Land Rover Discovery Sport 2019.png",
  "Land Rover Freelander 1997.png",
  "Land Rover Range Rover SV Coupé 2018.png",
  "Lexus GX 460 2010.png",
  "Lexus IS 2017.png",
  "Lexus IS F 2008.png",
  "Lexus LFA 2012.png",
  "Lexus LM 2023.png",
  "Lexus RX 300 2000.png",
  "Lexus RZ 450e 2023.png",
  "Lexus SC 1998.png",
  "Lexus UX 2021.png",
  "Lotus Elise 2011.png",
  "Lotus Emira 2022.png",
  "Lotus Emira 2023.png",
  "Lotus Emira GT4 2023.png",
  "Lotus Evora GT430 2020.png",
  "Lotus Exige 2004.png",
  "Lotus Exige 2012.png",
  "Lotus Exige GT430 2018.png",
  "Lotus Exige S2 2009.png",
  "MINI Cooper S 2019.png",
  "Maserati MC12 2005.png",
  "Maserati Quattroporte 2024.png",
  "Maserati Quattroporte V Sport GT S 2010.png",
  "Mastretta MXT 2011.png",
  "Mastretta MXT 2012.png",
  "Mazda 3 2019.png",
  "Mazda 323 GT-R 1992.png",
  "Mazda 6 2018.png",
  "Mazda 626 1990.png",
  "Mazda CX-30 2020.png",
  "Mazda CX-9 2021.png",
  "Mazda CX-90 2024.png",
  "Mazda Cosmo Sport L10A 1967.png",
  "Mazda MX-30 2021.png",
  "Mazda MX-5 Miata 2019.png",
  "Mazda RX-7 1978.png",
  "Mazda RX-7 Turbo II 1989.png",
  "Mazda RX-8 2004.png",
  "McLaren 570S 2015.png",
  "McLaren 620R 2020.png",
  "McLaren 650S 2014.png",
  "McLaren 720S 2017.png",
  "McLaren 720S Spider 2019.png",
  "McLaren 750S 2023.png",
  "McLaren Artura 2022.png",
  "McLaren Artura Spider 2025.png",
  "McLaren Elva 2020.png",
  "McLaren MP4-12C 2014.png",
  "McLaren P1 2013.png",
  "McLaren P1 GTR 2015.png",
  "McLaren Sabre 2020.png",
  "McLaren Senna 2018.png",
  "McLaren Solus GT 2023.png",
  "McLaren Speedtail 2020.png",
  "Mercedes-AMG A35 2019.png",
  "Mercedes-AMG A45 S 2023.png",
  "Mercedes-AMG C 63 S E Performance 2024.png",
  "Mercedes-AMG C63 2016.png",
  "Mercedes-AMG C63 S 2014.png",
  "Mercedes-AMG CLA 45 2020.png",
  "Mercedes-AMG E63 S 2017.png",
  "Mercedes-AMG E63 S 2021.png",
  "Mercedes-AMG E63 S Estate 2020.png",
  "Mercedes-AMG E63 S Wagon 2021.png",
  "Mercedes-AMG GLE 63 S Coupe 2024.png",
  "Mercedes-AMG GLS 63 2020.png",
  "Mercedes-AMG GT Black Series 2021.png",
  "Mercedes-AMG GT R (C190) 2017.png",
  "Mercedes-AMG ONE 2022.png",
  "Mercedes-AMG SL 63 2022.png",
  "Mercedes-Benz C63 AMG 2012.png",
  "Mercedes-Benz C63 AMG 2015.png",
  "Mercedes-Benz CL 65 AMG 2022.png",
  "Mercedes-Benz E-Class W124 1996.png",
  "Mercedes-Benz E63 AMG 2016.png",
  "Mercedes-Benz E63 AMG 2018.png",
  "Mercedes-Benz G500 4×4² 2015.png",
  "Mercedes-Benz G63 AMG 6×6 2015.png",
  "Mercedes-Benz G63 AMG W463 2019.png",
  "Mercedes-Benz GLA 200 2019.png",
  "Mercedes-Benz GLC 2015.png",
  "Mercedes-Benz SL R32 2022.png",
  "Mercedes-Benz SL65 AMG 2009.png",
  "Mercedes-Benz SLC43 AMG 2017.png",
  "Mercedes-Benz SLC43 AMG 2018.png",
  "Mercedes-Benz SLK55 AMG 2005.png",
  "Mercedes-Benz SLK55 AMG 2011.png",
  "Mercedes-Benz SLR McLaren 2003.png",
  "Mercedes-Benz SLR McLaren 2005.png",
  "Mercedes-Benz Sprinter 1995.png",
  "Mercedes-Benz Sprinter 2002.png",
  "Mercedes-Benz V-Class 1998.png",
  "Mercedes-Benz V-Class 2003.png",
  "Mercedes-Benz V-Class 2004.png",
  "Mercedes-Benz Vito 1996.png",
  "Mercedes-Maybach S-Class Pullman 2018.png",
  "Mercedes-Maybach S-Class W223 2021.png",
  "Metalinis mėlynas Nissan GT-R.png",
  "Mitsubishi 3000GT 2001.png",
  "Mitsubishi Delica D_5 20012.png",
  "Mitsubishi Eclipse 1998.png",
  "Mitsubishi Galant VR-4 1992.png",
  "Mitsubishi Lancer Evolution IX 2006.png",
  "Mitsubishi Lancer Evolution VIII 2003.png",
  "Mitsubishi Lancer Evolution X 2008.png",
  "Mitsubishi Space Wagon 1997.png",
  "Morgan Aero 8 GTN 2004.png",
  "Morgan Plus 8 1969.png",
  "Morgan Roadster 2010.png",
  "Morris Minor 1948.png",
  "Nissan 300ZX Turbo 1984.png",
  "Nissan 350Z 2004.png",
  "Nissan 370Z 2009.png",
  "Nissan Ariya EV 2022.png",
  "Nissan D21 1986.png",
  "Nissan Frontier 2022.png",
  "Nissan Leaf 2010.png",
  "Nissan Patrol 2025.png",
  "Nissan Quest 1998.png",
  "Nissan Sentra 2024.png",
  "Nissan Serena e-Power 2025.png",
  "Nissan Silvia S15 1999.png",
  "Nissan Skyline 400R 2019.png",
  "Nissan Skyline R30 1981.png",
  "Nissan Stagea 2001.png",
  "Nissan Titan 2019.png",
  "Nissan X-Trail 2020.png",
  "Nissan Z 2023.png",
  "Noble M400 2004.png",
  "Noble M600 2017.png",
  "Opel Speedster 2001.png",
  "Opel Vivaro 2001.png",
  "Pagani Huayra 2017.png",
  "Pagani Huayra Roadster 2017.png",
  "Pagani Zonda 2007.png",
  "Panoz Esperante 2002.png",
  "Panoz Esperante 2003.png",
  "Peugeot Boxer 1994.png",
  "Peugeot Boxer 2001.png",
  "Peugeot Expert 2011.png",
  "Peugeot Partner 2000.png",
  "Peugeot Partner 2002.png",
  "Peugeot Partner.png",
  "Peugeot RCZ 2013.png",
  "Peugeot Traveller 2017.png",
  "Pininfarina Battista 2019.png",
  "Plymouth 'Cuda 1971.png",
  "Plymouth Duster 340.png",
  "Plymouth Superbird 1970.png",
  "Polestar 1 2021.png",
  "Polestar 3 2022.png",
  "Pontiac Fiero 1984.png",
  "Pontiac Firebird Trans Am 1998.png",
  "Pontiac G8 2008.png",
  "Pontiac GTO 2004.png",
  "Pontiac Solstice 2006.png",
  "Pontiac Solstice GXP 2006.png",
  "Porsche 718 Cayman GT4 RS 2022.png",
  "Porsche 911 Carrera S 2019.png",
  "Porsche 911 Dakar 2023.png",
  "Porsche 911 GT2 2002.png",
  "Porsche 911 GT2 RS (991.2) 2018.png",
  "Porsche 911 GT3 2019.png",
  "Porsche 911 GT3 2022.png",
  "Porsche 911 GT3 RS 2022.png",
  "Porsche 911 GT3 Touring 2022.png",
  "Porsche 911 Sport Classic 2022.png",
  "Porsche 911 Turbo 2000.png",
  "Porsche 911 Turbo 930 1975.png",
  "Porsche 911 Turbo S 2020.png",
  "Porsche 918 Spyder 2013.png",
  "Porsche Boxster 2013.png",
  "Porsche Carrera GT 2005.png",
  "Porsche Cayenne 2003.png",
  "Porsche Cayman 2010.png",
  "Porsche Cayman 2012.png",
  "Porsche Cayman 2014.png",
  "Porsche Cayman GT4 RS 2022.png",
  "Porsche Panamera 2011.png",
  "Porsche Panamera 2016.png",
  "Porsche Panamera Turbo 2014.png",
  "Porsche Panamera Turbo S 2021.png",
  "Porsche Taycan 2020.png",
  "Porsche Taycan GTS 2025.png",
  "Porsche Taycan Turbo S 2020.png",
  "RAM 1500 2020.png",
  "RAM 1500 TRX 2021.png",
  "RUF CTR3 Clubsport 2012.png",
  "Ram ProMaster 2013.png",
  "Ram ProMaster 2014.png",
  "Ram ProMaster Teal Van 2013.png",
  "Renault 4CV 1947.png",
  "Renault 5 Turbo 1980.png",
  "Renault Kangoo 1997.png",
  "Renault Kangoo 2003.png",
  "Renault Master 2000.png",
  "Renault Master 2006.png",
  "Renault Mégane R.S. 2015.png",
  "Renault Trafic 2001.png",
  "Renault Trafic 2004.png",
  "Rezvani Hercules 4x4 2023.png",
  "Rezvani Hercules 6x6 2021.png",
  "Rezvani Tank 2025.png",
  "Rimac Concept_One 2016.png",
  "Rimac Nevera 2021.png",
  "Rimac Nevera 2022.png",
  "Rivian R1S 2022.png",
  "Rivian R1T 2021.png",
  "Rolls-Royce Cullinan 2025.png",
  "Rolls-Royce Dawn 2023.png",
  "Rolls-Royce Ghost (Series I) 2014.png",
  "Rolls-Royce Ghost 2014.png",
  "Rolls-Royce Ghost 2020.png",
  "Rolls-Royce Ghost 2025.png",
  "Rolls-Royce Phantom 2024.png",
  "Rolls-Royce Phantom Drophead Coupe 2016.png",
  "Rolls-Royce Phantom VII 2003.png",
  "Rolls-Royce Phantom VIII 2018.png",
  "Rolls-Royce Spectre 2024.png",
  "Rolls-Royce Wraith 2013.png",
  "SEAT Ateca 2016.png",
  "SEAT Leon Cupra 2017.png",
  "SSC Tuatara 2020.png",
  "Saab 900 Turbo 1978.png",
  "Saleen S7 2004.png",
  "Saturn Sky 2006.png",
  "Saturn Sky 2007.png",
  "Shelby Cobra 427 1965.png",
  "Smart Roadster 2003.png",
  "Spyker C8 Aileron 2009.png",
  "Spyker C8 Spyder 2009.png",
  "Standard Eight 1938.png",
  "Subaru Ascent 2018.png",
  "Subaru Impreza 2015.png",
  "Subaru Impreza WRX STI 2006.png",
  "Subaru Legacy 2020.png",
  "Subaru Levorg 2020.png",
  "Subaru SVX 1996.png",
  "Subaru Solterra 2023.png",
  "Subaru WRX STI 2014.png",
  "Subaru WRX STI 2015.png",
  "Subaru WRX STI 2018.png",
  "Suzuki Alto Works 1987.png",
  "Suzuki Cappuccino 1991.png",
  "Suzuki Hustler 2020.png",
  "Suzuki Jimny 1975.png",
  "Suzuki Jimny 2019.png",
  "Suzuki Vitara 1988.png",
  "Škoda Kodiaq 2016.png",
  "Škoda Octavia vRS 2025.png",
  "TVR Chimaera на белом фоне.png",
  "TVR Sagaris 2005.png",
  "TVR Tuscan 1999.png",
  "Tesla Cybertruck 2024.png",
  "Tesla Model 3 2018.png",
  "Tesla Model S Plaid 2023.png",
  "Tesla Model S Plaid+ 2023.png",
  "Tesla Model X 2022.png",
  "Toyota 4Runner 1986.png",
  "Toyota 4Runner 1989.png",
  "Toyota 86 2016.png",
  "Toyota AE86 1987.png",
  "Toyota Alphard 2023.png",
  "Toyota Celica GT-Four 1994.png",
  "Toyota Corolla 2020.png",
  "Toyota Crown 2018.png",
  "Toyota FJ Cruiser 2008.png",
  "Toyota Fortuner 2020.png",
  "Toyota GR Corolla 2023.png",
  "Toyota GR Corolla 2025.png",
  "Toyota GR Supra 2020.png",
  "Toyota GR Yaris 2020.png",
  "Toyota GR86 2022.png",
  "Toyota Grand Highlander 2024.png",
  "Toyota HiAce 1990.png",
  "Toyota Hilux Arctic Trucks C3 2021.png",
  "Toyota Land Cruiser Prado 2018.png",
  "Toyota MR-S 2000.png",
  "Toyota MR-S Spyder 2000.png",
  "Toyota MR2 1995.png",
  "Toyota Prius Prime 2018.png",
  "Toyota Sequoia 1999.png",
  "Toyota Sienna 1999.png",
  "Toyota Supra Turbo 1987.png",
  "Toyota Tacoma 1995.png",
  "Toyota Tacoma 1997.png",
  "Toyota Tacoma 2016.png",
  "Toyota Tundra 2008.png",
  "Toyota Tundra 2022.png",
  "Toyota bZ4X 2022.png",
  "Toyota bZ4X 2023.png",
  "Turkioji Mercedes-AMG E63 S Wagone.png",
  "VUHL 05RR 2020.png",
  "Vauxhall VXR8 2014.png",
  "Volkswagen Atlas 2018.png",
  "Volkswagen Beetle 1950.png",
  "Volkswagen Caddy 1996.png",
  "Volkswagen Golf GTI MK7 2018.png",
  "Volkswagen Golf Mk2 1985.png",
  "Volkswagen ID7 2024.png",
  "Volkswagen Jetta 2017.png",
  "Volkswagen Jetta Mk2 1986.png",
  "Volkswagen Passat B2 1985.png",
  "Volkswagen Scirocco R 2009.png",
  "Volkswagen Scirocco R 2014.png",
  "Volkswagen Transporter T4 1995.png",
  "Volkswagen Transporter T4 1996.png",
  "W Motors Lykan HyperSport 2014.png",
  "Wiesmann GT MF5 2010.png",
  "Yugo GV 1985.png",
  "Yugo GV 1988.png",
  "Zenvo TSR-S 2019.png",
  "Šampaninės spalvos Aston Martin DB12.png",
];

// Car pricing data based on make, model, and year
const CAR_PRICING_DATA = {
  // Volkswagen
  "Volkswagen Scirocco R": { price: 35000, type: "RARE", year: 2009 },
  "Volkswagen Golf GTI": { price: 35000, type: "RARE", year: 2022 },
  "Volkswagen ID4": { price: 45000, type: "REGULAR", year: 2023 },

  // Toyota
  "Toyota Tundra": { price: 25000, type: "REGULAR", year: 2008 },
  "Toyota Tacoma": { price: 15000, type: "REGULAR", year: 1997 },
  "Toyota Supra": { price: 65000, type: "EPIC", year: 2023 },
  "Toyota Land Cruiser 300": { price: 95000, type: "EPIC", year: 2023 },
  "Toyota Highlander": { price: 45000, type: "REGULAR", year: 2023 },
  "Toyota GR Corolla": { price: 40000, type: "RARE", year: 2023 },
  "Toyota Camry": { price: 35000, type: "REGULAR", year: 2023 },
  "Toyota FJ Cruiser": { price: 35000, type: "RARE", year: 2008 },
  "Toyota Supra Turbo": { price: 35000, type: "RARE", year: 1987 },

  // W Motors
  "W Motors Lykan HyperSport": {
    price: 3400000,
    type: "LEGENDARY",
    year: 2014,
  },

  // Opel
  "Opel Speedster": { price: 45000, type: "RARE", year: 2001 },

  // Porsche
  "Porsche Panamera Turbo": { price: 180000, type: "EPIC", year: 2014 },
  "Porsche Cayman": { price: 85000, type: "EPIC", year: 2012 },
  "Porsche 911 Carrera S": { price: 120000, type: "EPIC", year: 2019 },
  "Porsche Taycan GTS": { price: 130000, type: "LEGENDARY", year: 2025 },
  "Porsche 911 GT3 RS": { price: 220000, type: "LEGENDARY", year: 2022 },
  "Porsche 918 Spyder": { price: 1800000, type: "LEGENDARY", year: 2013 },
  "Porsche Cayman GT4 RS": { price: 150000, type: "LEGENDARY", year: 2022 },

  // Lamborghini
  "Lamborghini Sian": { price: 3500000, type: "LEGENDARY", year: 2019 },
  "Lamborghini Gallardo LP 570-4 SuperLeggera": {
    price: 220000,
    type: "LEGENDARY",
    year: 2010,
  },
  "Lamborghini Huracán EVO": { price: 280000, type: "LEGENDARY", year: 2019 },
  "Lamborghini Aventador SV": { price: 450000, type: "LEGENDARY", year: 2015 },
  "Lamborghini Countach LPI 800-4": {
    price: 2500000,
    type: "LEGENDARY",
    year: 2021,
  },

  // Spyker
  "Spyker C8 Spyder": { price: 280000, type: "LEGENDARY", year: 2009 },
  "Spyker C8 Aileron": { price: 320000, type: "LEGENDARY", year: 2009 },

  // AMC
  "AMC Hurst SC_Rambler": { price: 85000, type: "RARE", year: 1969 },

  // McLaren
  "McLaren Elva": { price: 1700000, type: "LEGENDARY", year: 2020 },
  "McLaren 620R": { price: 350000, type: "LEGENDARY", year: 2020 },
  "McLaren 720S Spider": { price: 320000, type: "LEGENDARY", year: 2019 },
  "McLaren Sport Car": { price: 250000, type: "LEGENDARY", year: 2023 },

  // Chevrolet
  "Chevrolet Express Cargo Van": { price: 35000, type: "REGULAR", year: 2020 },
  "Chevrolet Silverado EV": { price: 85000, type: "EPIC", year: 2024 },
  "Chevrolet Suburban": { price: 75000, type: "EPIC", year: 2025 },

  // Audi
  "Audi Q5": { price: 55000, type: "REGULAR", year: 2023 },
  "Audi RS 3 Sportback": { price: 75000, type: "EPIC", year: 2023 },
  "Audi TT": { price: 55000, type: "RARE", year: 2017 },
  "Audi RS5": { price: 85000, type: "EPIC", year: 2023 },

  // Chrysler
  "Chrysler 300 Hurst": { price: 65000, type: "RARE", year: 1970 },
  "Chrysler 300 S": { price: 45000, type: "REGULAR", year: 2019 },
  "Chrysler LeBaron": { price: 15000, type: "REGULAR", year: 1984 },

  // Jaguar
  "Jaguar XKR": { price: 45000, type: "RARE", year: 2005 },

  // Citroën
  "Citroën Jumper": { price: 25000, type: "REGULAR", year: 2002 },

  // Ferrari
  "Ferrari Monza SP2": { price: 1800000, type: "LEGENDARY", year: 2020 },
  "Ferrari Portofino": { price: 220000, type: "LEGENDARY", year: 2021 },
  "Ferrari Enzo": { price: 3000000, type: "LEGENDARY", year: 2002 },
  "Ferrari 488 Spider": { price: 280000, type: "LEGENDARY", year: 2018 },
  "Ferrari F12": { price: 320000, type: "LEGENDARY", year: 2015 },
  "Ferrari 488 Pista": { price: 350000, type: "LEGENDARY", year: 2018 },

  // Ford
  "Ford Mustang Mach 1": { price: 65000, type: "EPIC", year: 2021 },
  "Ford Shelby GT500": { price: 75000, type: "EPIC", year: 2007 },
  "Ford Mustang Shelby GT500": { price: 85000, type: "EPIC", year: 2013 },
  "Ford Transit": { price: 25000, type: "REGULAR", year: 2000 },

  // Nissan
  "Nissan Silvia S15": { price: 45000, type: "RARE", year: 1999 },
  "Nissan X-Trail": { price: 35000, type: "REGULAR", year: 2020 },
  "Nissan Titan": { price: 45000, type: "REGULAR", year: 2019 },
  "Nissan 350Z": { price: 25000, type: "RARE", year: 2004 },
  "Nissan Ariya EV": { price: 45000, type: "EPIC", year: 2022 },

  // Bentley
  "Bentley Bentayga Speed": { price: 220000, type: "LEGENDARY", year: 2021 },

  // Zenvo
  "Zenvo TSR-S": { price: 1800000, type: "LEGENDARY", year: 2019 },

  // Mercedes-Benz
  "Mercedes-Benz CL 65 AMG": { price: 180000, type: "LEGENDARY", year: 2022 },
  "Mercedes-AMG C63 S": { price: 85000, type: "EPIC", year: 2014 },
  "Mercedes-Benz SLR McLaren": { price: 850000, type: "LEGENDARY", year: 2005 },
  "Mercedes-AMG GLE 63 S Coupe": {
    price: 150000,
    type: "LEGENDARY",
    year: 2024,
  },

  // Mazda
  "Mazda CX-90": { price: 45000, type: "REGULAR", year: 2024 },
  "Mazda 626": { price: 8000, type: "REGULAR", year: 1990 },

  // Pontiac
  "Pontiac G8": { price: 35000, type: "RARE", year: 2008 },
  "Pontiac Solstice GXP": { price: 35000, type: "RARE", year: 2006 },

  // Bollinger
  "Bollinger B1": { price: 125000, type: "EPIC", year: 2017 },

  // Dodge
  "Dodge Charger": { price: 45000, type: "REGULAR", year: 2023 },
  "Dodge Challenger SRT Hellcat": { price: 75000, type: "EPIC", year: 2020 },
  "Dodge Caravan": { price: 8000, type: "REGULAR", year: 1987 },
  "Dodge Charger Scat Pack": { price: 55000, type: "EPIC", year: 2023 },

  // Aston Martin
  "Aston Martin Victor": { price: 3500000, type: "LEGENDARY", year: 2020 },

  // Ariel
  "Ariel Atom": { price: 85000, type: "RARE", year: 2015 },

  // Lotus
  "Lotus Elise": { price: 45000, type: "RARE", year: 2011 },

  // Morgan
  "Morgan Roadster": { price: 65000, type: "RARE", year: 2010 },

  // Caterham
  "Caterham Seven": { price: 55000, type: "RARE", year: 2015 },

  // Saab
  "Saab 900 Turbo": { price: 25000, type: "RARE", year: 1978 },

  // Czinger
  "Czinger 21C": { price: 2000000, type: "LEGENDARY", year: 2023 },

  // BMW
  "BMW X5 G05": { price: 75000, type: "EPIC", year: 2019 },
  "BMW 4 Series Convertible": { price: 65000, type: "EPIC", year: 2022 },
  "BMW i8": { price: 150000, type: "LEGENDARY", year: 2015 },
  "BMW M6 Gran Coupe": { price: 120000, type: "EPIC", year: 2016 },
  "BMW M240i": { price: 55000, type: "EPIC", year: 2016 },

  // Delage
  "Delage D12": { price: 2200000, type: "LEGENDARY", year: 2023 },

  // Renault
  "Renault Master": { price: 25000, type: "REGULAR", year: 2000 },

  // Holden
  "Holden Commodore VF SS V Redline": {
    price: 45000,
    type: "RARE",
    year: 2014,
  },

  // Peugeot
  "Peugeot Expert": { price: 28000, type: "REGULAR", year: 2011 },
  "Peugeot Boxer": { price: 25000, type: "REGULAR", year: 2001 },

  // Hyundai
  "Hyundai Elantra N": { price: 35000, type: "RARE", year: 2022 },

  // Subaru
  "Subaru Impreza WRX STI": { price: 35000, type: "RARE", year: 2006 },

  // Rolls-Royce
  "Rolls-Royce Ghost": { price: 350000, type: "LEGENDARY", year: 2020 },

  // Suzuki
  "Suzuki Hustler": { price: 25000, type: "REGULAR", year: 2020 },

  // Škoda
  "Škoda Kodiaq": { price: 35000, type: "REGULAR", year: 2016 },

  // Polestar
  "Polestar 3": { price: 85000, type: "EPIC", year: 2022 },

  // Fisker
  "Fisker Ocean": { price: 75000, type: "EPIC", year: 2022 },

  // Abarth
  "Abarth 124 Spider": { price: 35000, type: "RARE", year: 2019 },

  // Rimac
  "Rimac Nevera": { price: 2500000, type: "LEGENDARY", year: 2022 },
  "Rimac Concept_One": { price: 1200000, type: "LEGENDARY", year: 2016 },

  // Additional comprehensive pricing for new cars
  // Acura
  "Acura Integra Type S": { price: 45000, type: "RARE", year: 2023 },
  "Acura NSX": { price: 160000, type: "LEGENDARY", year: 2017 },
  "Acura RDX": { price: 45000, type: "REGULAR", year: 2022 },
  "Acura ZDX 2024 EV": { price: 65000, type: "EPIC", year: 2024 },

  // Alfa Romeo
  "Alfa Romeo 4C": { price: 65000, type: "RARE", year: 2015 },
  "Alfa Romeo 8C Competizione": {
    price: 300000,
    type: "LEGENDARY",
    year: 2010,
  },
  "Alfa Romeo GTV6": { price: 35000, type: "RARE", year: 1983 },

  // Alpine
  "Alpine A110": { price: 75000, type: "RARE", year: 2017 },
  "Alpine A290": { price: 45000, type: "RARE", year: 2025 },

  // Aston Martin (additional models)
  "Aston Martin DB9": { price: 180000, type: "LEGENDARY", year: 2004 },
  "Aston Martin DBS": { price: 220000, type: "LEGENDARY", year: 2010 },
  "Aston Martin DBS Superleggera": {
    price: 320000,
    type: "LEGENDARY",
    year: 2019,
  },
  "Aston Martin Rapide AMR": { price: 250000, type: "LEGENDARY", year: 2019 },
  "Aston Martin V12 Vanquish": { price: 280000, type: "LEGENDARY", year: 2002 },
  "Aston Martin V12 Vantage S": {
    price: 200000,
    type: "LEGENDARY",
    year: 2015,
  },
  "Aston Martin V8 Vantage": { price: 150000, type: "LEGENDARY", year: 2012 },
  "Aston Martin Valhalla": { price: 3000000, type: "LEGENDARY", year: 2024 },
  "Aston Martin Valkyrie": { price: 3500000, type: "LEGENDARY", year: 2022 },
  "Aston Martin Vanquish": { price: 250000, type: "LEGENDARY", year: 2013 },

  // Audi (additional models)
  "Audi Q8": { price: 75000, type: "EPIC", year: 2019 },
  "Audi R8": { price: 180000, type: "LEGENDARY", year: 2008 },
  "Audi R8 V10": { price: 200000, type: "LEGENDARY", year: 2013 },
  "Audi RS3": { price: 65000, type: "EPIC", year: 2022 },

  "Audi RS6 Avant": { price: 120000, type: "EPIC", year: 2015 },
  "Audi RS7 Sportback": { price: 130000, type: "EPIC", year: 2023 },
  "Audi TTS": { price: 65000, type: "RARE", year: 2019 },
  "Audi e-tron GT": { price: 110000, type: "LEGENDARY", year: 2022 },

  // BMW (additional models)
  "BMW 330i": { price: 45000, type: "REGULAR", year: 2022 },
  "BMW M3": { price: 85000, type: "EPIC", year: 2014 },
  "BMW M4": { price: 75000, type: "EPIC", year: 2015 },
  "BMW M4 CSL": { price: 140000, type: "LEGENDARY", year: 2022 },
  "BMW M4 GTS": { price: 130000, type: "LEGENDARY", year: 2016 },
  "BMW M5": { price: 110000, type: "EPIC", year: 2013 },
  "BMW M5 F90": { price: 120000, type: "EPIC", year: 2021 },
  "BMW XM": { price: 160000, type: "LEGENDARY", year: 2023 },
  "BMW i7 M70": { price: 150000, type: "LEGENDARY", year: 2024 },

  // Bentley (additional models)
  "Bentley Azure": { price: 180000, type: "LEGENDARY", year: 2009 },
  "Bentley Continental": { price: 200000, type: "LEGENDARY", year: 2007 },
  "Bentley Continental GT": { price: 220000, type: "LEGENDARY", year: 2008 },
  "Bentley Flying Spur": { price: 250000, type: "LEGENDARY", year: 2020 },
  "Bentley Mulliner Bacalar": { price: 2000000, type: "LEGENDARY", year: 2020 },
  "Bentley Mulsanne Speed": { price: 350000, type: "LEGENDARY", year: 2018 },

  // Bugatti
  "Bugatti Centodieci": { price: 9000000, type: "LEGENDARY", year: 2022 },
  "Bugatti Divo": { price: 5800000, type: "LEGENDARY", year: 2021 },
  "Bugatti La Voiture Noire": {
    price: 18700000,
    type: "LEGENDARY",
    year: 2021,
  },
  "Bugatti Mistral": { price: 5000000, type: "LEGENDARY", year: 2022 },
  "Bugatti W16 Mistral": { price: 5000000, type: "LEGENDARY", year: 2022 },

  // Cadillac
  "Cadillac CT5-V Blackwing": { price: 95000, type: "EPIC", year: 2022 },
  "Cadillac CTS-V": { price: 85000, type: "EPIC", year: 2016 },
  "Cadillac Escalade": { price: 85000, type: "EPIC", year: 2023 },
  "Cadillac Lyriq": { price: 65000, type: "EPIC", year: 2023 },

  // Chevrolet (additional models)
  "Chevrolet Camaro": { price: 35000, type: "RARE", year: 1982 },
  "Chevrolet Camaro SS": { price: 45000, type: "RARE", year: 2010 },
  "Chevrolet Camaro ZL1": { price: 75000, type: "EPIC", year: 2018 },
  "Chevrolet Corvette C2": { price: 150000, type: "LEGENDARY", year: 1963 },
  "Chevrolet Corvette C5": { price: 35000, type: "RARE", year: 2004 },
  "Chevrolet Corvette E-Ray": { price: 120000, type: "EPIC", year: 2024 },
  "Chevrolet Corvette Stingray": { price: 65000, type: "EPIC", year: 1969 },
  "Chevrolet Corvette Z06": { price: 85000, type: "EPIC", year: 2003 },
  "Chevrolet Corvette ZR1": { price: 120000, type: "EPIC", year: 2009 },

  // Ferrari (additional models)
  "Ferrari 296 GTS": { price: 350000, type: "LEGENDARY", year: 2022 },
  "Ferrari 328 GTS": { price: 120000, type: "LEGENDARY", year: 1985 },
  "Ferrari 458 Speciale": { price: 280000, type: "LEGENDARY", year: 2013 },
  "Ferrari 458 Spider": { price: 250000, type: "LEGENDARY", year: 2011 },
  "Ferrari 488 GTB": { price: 250000, type: "LEGENDARY", year: 2015 },
  "Ferrari 575M Maranello": { price: 180000, type: "LEGENDARY", year: 2002 },
  "Ferrari 599 GTB": { price: 200000, type: "LEGENDARY", year: 2006 },
  "Ferrari 612 Scaglietti": { price: 220000, type: "LEGENDARY", year: 2008 },
  "Ferrari 812 GTS": { price: 400000, type: "LEGENDARY", year: 2020 },
  "Ferrari 812 Superfast": { price: 350000, type: "LEGENDARY", year: 2017 },
  "Ferrari California": { price: 200000, type: "LEGENDARY", year: 2011 },
  "Ferrari F430 Scuderia": { price: 180000, type: "LEGENDARY", year: 2007 },
  "Ferrari F430 Spider": { price: 160000, type: "LEGENDARY", year: 2007 },
  "Ferrari F8 Spider": { price: 280000, type: "LEGENDARY", year: 2020 },
  "Ferrari F8 Tributo": { price: 270000, type: "LEGENDARY", year: 2020 },
  "Ferrari FF": { price: 250000, type: "LEGENDARY", year: 2012 },
  "Ferrari GTC4Lusso": { price: 300000, type: "LEGENDARY", year: 2020 },
  "Ferrari LaFerrari": { price: 1400000, type: "LEGENDARY", year: 2013 },
  "Ferrari Portofino M": { price: 220000, type: "LEGENDARY", year: 2021 },
  "Ferrari Purosangue": { price: 400000, type: "LEGENDARY", year: 2023 },
  "Ferrari Roma": { price: 250000, type: "LEGENDARY", year: 2023 },
  "Ferrari Roma Spider": { price: 270000, type: "LEGENDARY", year: 2021 },
  "Ferrari SF90 Spider": { price: 500000, type: "LEGENDARY", year: 2021 },

  // Ford (additional models)
  "Ford Bronco": { price: 45000, type: "EPIC", year: 2021 },
  "Ford GT": { price: 450000, type: "LEGENDARY", year: 2005 },
  "Ford GT 2017": { price: 500000, type: "LEGENDARY", year: 2017 },
  "Ford Mustang Bullitt": { price: 55000, type: "EPIC", year: 2019 },
  "Ford Mustang Dark Horse": { price: 65000, type: "EPIC", year: 2024 },
  "Ford Mustang GTD": { price: 300000, type: "LEGENDARY", year: 2024 },
  "Ford Mustang SVO": { price: 35000, type: "RARE", year: 1984 },
  "Ford Shelby GT": { price: 45000, type: "RARE", year: 2007 },
  "Ford Shelby GT500 1967": { price: 150000, type: "LEGENDARY", year: 1967 },
  "Ford Shelby GT500 2020": { price: 75000, type: "EPIC", year: 2020 },

  // Honda
  "Honda Civic": { price: 25000, type: "REGULAR", year: 2022 },
  "Honda Civic Type R": { price: 45000, type: "RARE", year: 2023 },
  "Honda S2000": { price: 35000, type: "RARE", year: 2001 },
  "Honda S660": { price: 25000, type: "RARE", year: 2015 },

  // Hyundai
  "Hyundai Elantra": { price: 25000, type: "REGULAR", year: 2023 },
  "Hyundai Kona N": { price: 35000, type: "RARE", year: 2022 },
  "Hyundai Veloster N": { price: 30000, type: "RARE", year: 2021 },

  // Jaguar
  "Jaguar F-Type": { price: 75000, type: "EPIC", year: 2018 },
  "Jaguar F-Type SVR": { price: 120000, type: "EPIC", year: 2016 },
  "Jaguar XK8": { price: 25000, type: "RARE", year: 1997 },
  "Jaguar XKR-S": { price: 85000, type: "EPIC", year: 2014 },

  // Koenigsegg
  "Koenigsegg Agera RS": { price: 2500000, type: "LEGENDARY", year: 2015 },
  "Koenigsegg Gemera": { price: 1700000, type: "LEGENDARY", year: 2024 },
  "Koenigsegg Jesko": { price: 3000000, type: "LEGENDARY", year: 2019 },
  "Koenigsegg Jesko Absolut": { price: 3200000, type: "LEGENDARY", year: 2020 },
  "Koenigsegg One_1": { price: 2800000, type: "LEGENDARY", year: 2014 },
  "Koenigsegg Regera": { price: 2000000, type: "LEGENDARY", year: 2016 },

  // Lamborghini (additional models)
  "Lamborghini Aventador": { price: 400000, type: "LEGENDARY", year: 2011 },
  "Lamborghini Aventador S Coupe": {
    price: 450000,
    type: "LEGENDARY",
    year: 2021,
  },
  "Lamborghini Aventador Ultimae": {
    price: 500000,
    type: "LEGENDARY",
    year: 2021,
  },
  "Lamborghini Centenario": { price: 2000000, type: "LEGENDARY", year: 2016 },
  "Lamborghini Diablo": { price: 150000, type: "LEGENDARY", year: 1990 },
  "Lamborghini Essenza SCV12": {
    price: 2500000,
    type: "LEGENDARY",
    year: 2020,
  },
  "Lamborghini Gallardo": { price: 180000, type: "LEGENDARY", year: 2003 },
  "Lamborghini Huracan": { price: 200000, type: "LEGENDARY", year: 2014 },
  "Lamborghini Huracan LP610-4": {
    price: 220000,
    type: "LEGENDARY",
    year: 2015,
  },
  "Lamborghini Huracán STO": { price: 350000, type: "LEGENDARY", year: 2020 },
  "Lamborghini Murciélago": { price: 250000, type: "LEGENDARY", year: 2001 },
  "Lamborghini Revuelto": { price: 600000, type: "LEGENDARY", year: 2024 },
  "Lamborghini Urus": { price: 250000, type: "LEGENDARY", year: 2019 },
  "Lamborghini Veneno": { price: 4500000, type: "LEGENDARY", year: 2013 },

  // McLaren (additional models)
  "McLaren 570S": { price: 200000, type: "LEGENDARY", year: 2015 },
  "McLaren 650S": { price: 250000, type: "LEGENDARY", year: 2014 },
  "McLaren 720S": { price: 300000, type: "LEGENDARY", year: 2017 },
  "McLaren 750S": { price: 350000, type: "LEGENDARY", year: 2023 },
  "McLaren Artura": { price: 250000, type: "LEGENDARY", year: 2022 },
  "McLaren Artura Spider": { price: 280000, type: "LEGENDARY", year: 2025 },
  "McLaren MP4-12C": { price: 200000, type: "LEGENDARY", year: 2014 },
  "McLaren P1": { price: 1200000, type: "LEGENDARY", year: 2013 },
  "McLaren P1 GTR": { price: 3500000, type: "LEGENDARY", year: 2015 },
  "McLaren Sabre": { price: 3500000, type: "LEGENDARY", year: 2020 },
  "McLaren Senna": { price: 1000000, type: "LEGENDARY", year: 2018 },
  "McLaren Solus GT": { price: 4000000, type: "LEGENDARY", year: 2023 },
  "McLaren Speedtail": { price: 2200000, type: "LEGENDARY", year: 2020 },

  // Mercedes-AMG (additional models)
  "Mercedes-AMG A35": { price: 45000, type: "RARE", year: 2019 },
  "Mercedes-AMG A45 S": { price: 55000, type: "EPIC", year: 2023 },
  "Mercedes-AMG C 63 S E Performance": {
    price: 120000,
    type: "LEGENDARY",
    year: 2024,
  },
  "Mercedes-AMG C63": { price: 85000, type: "EPIC", year: 2016 },
  "Mercedes-AMG CLA 45": { price: 55000, type: "EPIC", year: 2020 },
  "Mercedes-AMG E63 S": { price: 110000, type: "EPIC", year: 2017 },
  "Mercedes-AMG GT Black Series": {
    price: 350000,
    type: "LEGENDARY",
    year: 2021,
  },
  "Mercedes-AMG GT R": { price: 200000, type: "LEGENDARY", year: 2017 },
  "Mercedes-AMG ONE": { price: 2700000, type: "LEGENDARY", year: 2022 },

  // Nissan
  "Nissan 300ZX Turbo": { price: 25000, type: "RARE", year: 1984 },
  "Nissan 370Z": { price: 35000, type: "RARE", year: 2009 },
  "Nissan Frontier": { price: 35000, type: "REGULAR", year: 2022 },
  "Nissan Leaf": { price: 30000, type: "REGULAR", year: 2010 },
  "Nissan Patrol": { price: 55000, type: "EPIC", year: 2025 },
  "Nissan Quest": { price: 25000, type: "REGULAR", year: 1998 },
  "Nissan Sentra": { price: 25000, type: "REGULAR", year: 2024 },
  "Nissan Serena e-Power": { price: 35000, type: "REGULAR", year: 2025 },
  "Nissan Skyline 400R": { price: 85000, type: "EPIC", year: 2019 },
  "Nissan Skyline R30": { price: 15000, type: "RARE", year: 1981 },
  "Nissan Stagea": { price: 20000, type: "RARE", year: 2001 },
  "Nissan Z": { price: 45000, type: "RARE", year: 2023 },

  // Pagani
  "Pagani Huayra": { price: 2500000, type: "LEGENDARY", year: 2017 },
  "Pagani Huayra Roadster": { price: 2800000, type: "LEGENDARY", year: 2017 },
  "Pagani Zonda": { price: 1800000, type: "LEGENDARY", year: 2007 },

  // Porsche (additional models)
  "Porsche 718 Cayman GT4 RS": { price: 150000, type: "LEGENDARY", year: 2022 },
  "Porsche 911 Dakar": { price: 220000, type: "LEGENDARY", year: 2023 },
  "Porsche 911 GT2": { price: 200000, type: "LEGENDARY", year: 2002 },
  "Porsche 911 GT2 RS": { price: 300000, type: "LEGENDARY", year: 2018 },
  "Porsche 911 GT3": { price: 180000, type: "LEGENDARY", year: 2019 },
  "Porsche 911 GT3 Touring": { price: 190000, type: "LEGENDARY", year: 2022 },
  "Porsche 911 Sport Classic": { price: 250000, type: "LEGENDARY", year: 2022 },
  "Porsche 911 Turbo": { price: 150000, type: "LEGENDARY", year: 2000 },
  "Porsche 911 Turbo 930": { price: 120000, type: "LEGENDARY", year: 1975 },
  "Porsche 911 Turbo S": { price: 200000, type: "LEGENDARY", year: 2020 },
  "Porsche Boxster": { price: 65000, type: "EPIC", year: 2013 },
  "Porsche Carrera GT": { price: 450000, type: "LEGENDARY", year: 2005 },
  "Porsche Cayenne": { price: 85000, type: "EPIC", year: 2003 },

  "Porsche Panamera": { price: 95000, type: "EPIC", year: 2011 },
  "Porsche Panamera Turbo S": { price: 180000, type: "LEGENDARY", year: 2021 },
  "Porsche Taycan": { price: 85000, type: "EPIC", year: 2020 },
  "Porsche Taycan Turbo S": { price: 180000, type: "LEGENDARY", year: 2020 },

  // Rolls-Royce (additional models)
  "Rolls-Royce Cullinan": { price: 350000, type: "LEGENDARY", year: 2025 },
  "Rolls-Royce Dawn": { price: 350000, type: "LEGENDARY", year: 2023 },

  "Rolls-Royce Phantom": { price: 450000, type: "LEGENDARY", year: 2024 },
  "Rolls-Royce Phantom Drophead Coupe": {
    price: 400000,
    type: "LEGENDARY",
    year: 2016,
  },
  "Rolls-Royce Phantom VII": { price: 350000, type: "LEGENDARY", year: 2003 },
  "Rolls-Royce Phantom VIII": { price: 450000, type: "LEGENDARY", year: 2018 },
  "Rolls-Royce Spectre": { price: 400000, type: "LEGENDARY", year: 2024 },
  "Rolls-Royce Wraith": { price: 350000, type: "LEGENDARY", year: 2013 },

  // Tesla
  "Tesla Cybertruck": { price: 65000, type: "EPIC", year: 2024 },
  "Tesla Model 3": { price: 45000, type: "REGULAR", year: 2018 },
  "Tesla Model S Plaid": { price: 120000, type: "LEGENDARY", year: 2023 },
  "Tesla Model S Plaid+": { price: 150000, type: "LEGENDARY", year: 2023 },
  "Tesla Model X": { price: 95000, type: "EPIC", year: 2022 },

  // Toyota (additional models)
  "Toyota 4Runner": { price: 45000, type: "REGULAR", year: 1986 },
  "Toyota 86": { price: 30000, type: "RARE", year: 2016 },
  "Toyota AE86": { price: 25000, type: "RARE", year: 1987 },
  "Toyota Alphard": { price: 55000, type: "EPIC", year: 2023 },
  "Toyota Celica GT-Four": { price: 35000, type: "RARE", year: 1994 },
  "Toyota Corolla": { price: 25000, type: "REGULAR", year: 2020 },
  "Toyota Crown": { price: 45000, type: "REGULAR", year: 2018 },
  "Toyota Fortuner": { price: 40000, type: "REGULAR", year: 2020 },
  "Toyota GR Supra": { price: 55000, type: "EPIC", year: 2020 },
  "Toyota GR Yaris": { price: 35000, type: "RARE", year: 2020 },
  "Toyota GR86": { price: 30000, type: "RARE", year: 2022 },
  "Toyota Grand Highlander": { price: 45000, type: "REGULAR", year: 2024 },
  "Toyota HiAce": { price: 25000, type: "REGULAR", year: 1990 },
  "Toyota Hilux Arctic Trucks C3": { price: 65000, type: "EPIC", year: 2021 },
  "Toyota Land Cruiser Prado": { price: 55000, type: "EPIC", year: 2018 },
  "Toyota MR-S": { price: 20000, type: "RARE", year: 2000 },
  "Toyota MR2": { price: 15000, type: "RARE", year: 1995 },
  "Toyota Prius Prime": { price: 35000, type: "REGULAR", year: 2018 },
  "Toyota Sequoia": { price: 35000, type: "REGULAR", year: 1999 },
  "Toyota Sienna": { price: 30000, type: "REGULAR", year: 1999 },
  "Toyota bZ4X": { price: 45000, type: "EPIC", year: 2022 },

  // Volkswagen (additional models)
  "Volkswagen Atlas": { price: 35000, type: "REGULAR", year: 2018 },
  "Volkswagen Beetle": { price: 15000, type: "REGULAR", year: 1950 },
  "Volkswagen Caddy": { price: 20000, type: "REGULAR", year: 1996 },
  "Volkswagen Golf GTI MK7": { price: 30000, type: "RARE", year: 2018 },
  "Volkswagen Golf Mk2": { price: 8000, type: "RARE", year: 1985 },
  "Volkswagen ID7": { price: 55000, type: "EPIC", year: 2024 },
  "Volkswagen Jetta": { price: 25000, type: "REGULAR", year: 2017 },
  "Volkswagen Jetta Mk2": { price: 5000, type: "RARE", year: 1986 },
  "Volkswagen Passat B2": { price: 3000, type: "RARE", year: 1985 },

  "Volkswagen Transporter T4": { price: 15000, type: "REGULAR", year: 1995 },
};

export const processCarImages = async (progressCallback) => {
  console.log("Starting car image processing...");

  const totalFiles = ALL_CAR_FILES.length;
  const fileMappings = [];

  // Step 1: Read and process all files
  console.log(`Processing ${totalFiles} files...`);

  for (let i = 0; i < totalFiles; i++) {
    const filename = ALL_CAR_FILES[i];
    const carInfo = extractCarInfo(filename);
    const universalName = generateUniversalFilename(
      carInfo.make,
      carInfo.model
    );

    fileMappings.push({
      original: filename,
      renamed: universalName,
      carInfo: carInfo,
    });

    // Update progress for file processing
    if (progressCallback) {
      progressCallback({
        step: "Processing files",
        current: i + 1,
        total: totalFiles,
        percentage: Math.round(((i + 1) / totalFiles) * 100),
      });
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  console.log("File processing completed!");

  // Step 2: Simulate Firebase Storage operations
  console.log("Starting Firebase Storage operations...");

  // Simulate deleting existing files
  if (progressCallback) {
    progressCallback({
      step: "Deleting existing files from Firebase Storage",
      current: 1,
      total: 1,
      percentage: 0,
    });
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate uploading files with progress
  for (let i = 0; i < fileMappings.length; i++) {
    if (progressCallback) {
      progressCallback({
        step: "Uploading files to Firebase Storage",
        current: i + 1,
        total: fileMappings.length,
        percentage: Math.round(((i + 1) / fileMappings.length) * 100),
        currentFile: fileMappings[i].renamed,
      });
    }

    // Simulate upload time (varies by file size)
    const uploadTime = Math.random() * 200 + 100; // 100-300ms
    await new Promise((resolve) => setTimeout(resolve, uploadTime));
  }

  console.log("Firebase Storage operations completed!");
  console.log(`Processed ${fileMappings.length} files`);

  return fileMappings;
};

// Helper function to extract car info from filename
export const extractCarInfo = (filename) => {
  // Remove .png extension
  const nameWithoutExt = filename.replace(".png", "");

  // Split by spaces and try to extract make, model, and year
  const parts = nameWithoutExt.split(" ");

  // Look for year (4-digit number)
  const yearIndex = parts.findIndex((part) => /^\d{4}$/.test(part));
  let year = null;
  let makeModelParts = parts;

  if (yearIndex !== -1) {
    year = parseInt(parts[yearIndex]);
    makeModelParts = parts.filter((_, index) => index !== yearIndex);
  }

  // Handle special cases where make might be multiple words
  let make = "";
  let model = "";

  // Common multi-word makes
  const multiWordMakes = [
    "Aston Martin",
    "Mercedes-Benz",
    "Mercedes-AMG",
    "Land Rover",
    "Rolls-Royce",
    "Alfa Romeo",
    "De Tomaso",
    "W Motors",
    "Hispano Suiza",
  ];

  // Check if the first two words form a known make
  if (makeModelParts.length >= 2) {
    const potentialMake = `${makeModelParts[0]} ${makeModelParts[1]}`;
    if (multiWordMakes.includes(potentialMake)) {
      make = potentialMake;
      model = makeModelParts.slice(2).join(" ");
    } else {
      make = makeModelParts[0] || "";
      model = makeModelParts.slice(1).join(" ") || "";
    }
  } else {
    make = makeModelParts[0] || "";
    model = makeModelParts.slice(1).join(" ") || "";
  }

  return { make, model, year };
};

// Helper function to generate universal filename
export const generateUniversalFilename = (make, model) => {
  // Clean up the model name by removing only the year
  let cleanModel = model;

  // Remove year patterns (4-digit numbers) only
  cleanModel = cleanModel.replace(/\b\d{4}\b/g, "");

  // Remove extra spaces and trim
  cleanModel = cleanModel.replace(/\s+/g, " ").trim();

  // Remove leading/trailing spaces and dashes
  cleanModel = cleanModel.replace(/^[\s-]+|[\s-]+$/g, "");

  // If model is empty after cleaning, use a default
  if (!cleanModel) {
    cleanModel = "Model";
  }

  return `${make} ${cleanModel}.png`;
};

// Helper function to get car pricing data
export const getCarPricingData = (make, model) => {
  const key = `${make} ${model}`;
  return (
    CAR_PRICING_DATA[key] || {
      price: 25000,
      type: "REGULAR",
      year: 2020,
    }
  );
};

// Generate car data for all files
export const generateAllCarData = () => {
  return ALL_CAR_FILES.map((filename) => {
    const carInfo = extractCarInfo(filename);
    const pricingData = getCarPricingData(carInfo.make, carInfo.model);

    return {
      make: carInfo.make,
      model: carInfo.model,
      year: carInfo.year || pricingData.year,
      price: pricingData.price,
      type: pricingData.type,
    };
  });
};

// Test function to preview filename transformations
export const previewFilenameTransformations = () => {
  const examples = [
    "Alfa Romeo 4C 2015.png",
    "Aston Martin DBS 2010.png",
    "Audi Q8 2019.png",
    "BMW M3 2014.png",
    "Ferrari 488 GTB 2015.png",
    "Lamborghini Huracán EVO 2019.png",
    "Mercedes-AMG GT Black Series 2021.png",
    "Porsche 911 GT3 RS 2022.png",
    "Toyota GR Corolla 2023.png",
    "Volkswagen Golf GTI MK7 2018.png",
  ];

  console.log("Filename transformation examples:");
  examples.forEach((filename) => {
    const carInfo = extractCarInfo(filename);
    const newName = generateUniversalFilename(carInfo.make, carInfo.model);
    console.log(`${filename} → ${newName}`);
  });
};
