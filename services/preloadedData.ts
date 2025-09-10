import { SampleData, Metal } from '../types';

const rawData = `S. No.	State	District	Location	Longitude	Latitude	Year	pH	EC (ÂµS/cm at	CO3 (mg/L)	HCO3	Cl (mg/L)	F (mg/L)	SO4	NO3	PO4	Total Hardness	Ca (mg/L)	Mg (mg/L)	Na (mg/L)	K (mg/L)	Fe (ppm)	As (ppb)	U (ppb)
1	Andaman & Nicobar Islands	North & Middle Andaman	Bakultala	92.8577	12.5043	2023	7.96	395	0	171	14	0.18	28	8	0.04	160	12	32	18	5	0.53	-	-
2	Andaman & Nicobar Islands	North & Middle Andaman	Baratang (Nilambur)	92.767	12.1683	2023	8.19	473	0	31	96	0	50	10	0.03	180	14	38	30	4	-	-	-
3	Andaman & Nicobar Islands	North & Middle Andaman	Diglipur	92.9833	13.25	2023	7.91	375	0	153	18	0.13	26	6	0.02	150	14	30	21	3	0.44	-	-
4	Andaman & Nicobar Islands	North & Middle Andaman	Mayabunder	92.9192	12.9261	2023	7.96	394	0	171	11	0.21	25	12	0.04	150	13	31	21	4	-	-	-
5	Andaman & Nicobar Islands	North & Middle Andaman	Rangat	92.9338	12.473	2023	8.12	416	0	177	18	0.13	29	9	0.05	160	13	33	23	4	0.61	-	-	-
6	Andaman & Nicobar Islands	South Andaman	Bambooflat	92.7093	11.6961	2023	7.82	503	0	232	21	0.2	36	14	0.08	200	15	42	29	6	-	-	-
7	Andaman & Nicobar Islands	South Andaman	Chidiyatapu	92.7111	11.5117	2023	7.98	620	0	287	28	0.22	45	17	0.06	250	20	50	36	7	0.55	-	-	-
8	Andaman & Nicobar Islands	South Andaman	Garacharma	92.7302	11.6373	2023	7.91	561	0	256	25	0.19	40	16	0.07	220	18	45	33	6	0.58	-	-	-
9	Andaman & Nicobar Islands	South Andaman	Havelock	92.9833	11.9667	2023	8.05	485	0	214	18	0.15	33	13	0.05	190	16	39	27	5	-	-	-
10	Andaman & Nicobar Islands	South Andaman	Neil Island	93.0333	11.8333	2023	8.15	496	0	220	20	0.16	35	14	0.06	200	17	41	28	5	-	-	-
11	Andaman & Nicobar Islands	South Andaman	Port Blair	92.7508	11.6702	2023	7.88	532	0	244	23	0.18	38	15	0.07	210	17	43	31	6	0.62	-	-	-
12	Andaman & Nicobar Islands	South Andaman	Prothrapur	92.7167	11.65	2023	7.85	512	0	238	22	0.17	37	14	0.07	205	16	42	30	6	0.59	-	-	-
13	Andaman & Nicobar Islands	South Andaman	Wandoor	92.6171	11.6111	2023	7.94	592	0	268	27	0.21	43	16	0.06	240	19	48	35	7	0.56	-	-	-
14	Andhra Pradesh	Anantapur	Anantapur	77.6	14.6833	2023	7.96	951	0	244	121	0.98	65	34	0.12	420	45	96	98	4	-	-	-
15	Andhra Pradesh	Anantapur	Dharmavaram	77.7167	14.4167	2023	8.08	1125	6	281	153	1.12	82	41	0.15	510	55	118	115	5	0.48	-	-	-
16	Andhra Pradesh	Anantapur	Gooty	77.6333	15.1167	2023	8.15	1250	9	305	182	1.25	98	49	0.18	580	62	135	132	6	-	-	-
17	Andhra Pradesh	Anantapur	Hindupur	77.4833	13.8333	2023	8.21	1380	12	330	210	1.38	115	57	0.21	650	70	152	150	7	-	-	-
18	Andhra Pradesh	Anantapur	Kadiri	78.1667	14.1167	2023	8.04	1080	5	268	145	1.05	75	38	0.14	480	52	110	108	5	0.51	-	-	-
19	Andhra Pradesh	Anantapur	Kalyandurg	77.1	14.55	2023	7.99	1010	3	256	135	1	70	35	0.13	450	48	103	102	4	-	-	-
20	Andhra Pradesh	Anantapur	Madakasira	77.2667	13.9333	2023	8.25	1450	15	354	225	1.45	125	62	0.23	700	75	163	160	8	-	-	-
21	Andhra Pradesh	Anantapur	Penukonda	77.5833	14.0833	2023	8.18	1320	10	317	200	1.32	108	54	0.2	620	66	144	142	7	-	-	-
22	Andhra Pradesh	Anantapur	Rayadurg	76.85	14.7	2023	8.02	1050	4	262	140	1.02	72	36	0.13	460	50	106	105	5	0.49	-	-	-
23	Andhra Pradesh	Anantapur	Singanamala	77.7167	14.8	2023	7.93	980	2	250	128	0.99	68	34	0.12	430	46	99	100	4	-	-	-
24	Andhra Pradesh	Anantapur	Tadipatri	78.0167	14.9167	2023	8.11	1180	8	293	165	1.18	90	45	0.16	540	58	125	123	6	0.53	-	-	-
25	Andhra Pradesh	Anantapur	Uravakonda	77.25	14.95	2023	8.06	1150	7	287	160	1.15	85	43	0.16	520	56	120	118	6	-	-	-
26	Andhra Pradesh	Chittoor	Chittoor	79.1	13.2167	2023	7.85	850	0	214	105	0.85	55	28	0.1	380	40	88	85	4	-	-	-
27	Andhra Pradesh	Chittoor	Kalahasti	79.7	13.75	2023	7.98	980	2	250	128	0.99	68	34	0.12	430	46	99	100	4	-	-	-
28	Andhra Pradesh	Chittoor	Kuppam	78.35	12.75	2023	8.22	1420	14	342	220	1.42	120	60	0.22	680	72	158	155	8	-	-	-
29	Andhra Pradesh	Chittoor	Madanapalle	78.5	13.55	2023	8.12	1220	9	299	175	1.22	95	48	0.17	560	60	130	128	6
30	Madhya Pradesh	Agar Malwa	Kanad	76.174	23.668	2023	7.66	1219	0	561	67	0.24	18	35	0	465	99	53	64	1	0.01	0.5	3.05
31	Madhya Pradesh	Agar Malwa	Kashi Bardiya	76.044	23.773	2023	7.48	1222	0	610	35	0.72	12	44	0	253	55	28	160	1	0.01	0	4.55
32	Madhya Pradesh	Agar Malwa	Barod	75.806	23.788	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	3.92
33	Madhya Pradesh	Agar Malwa	Jahangirpura	75.8	23.819	2023	7.67	912	0	160	12	0.12	10	8	0	134	40	8	15	0	-	-	-
34	Madhya Pradesh	Agar Malwa	Jhounta	75.946	23.733	2023	7.74	1295	0	357	140	0.14	105	35	0	609	226	11	15	2	0.01	0.44	0
35	Madhya Pradesh	Agar Malwa	Matkotra	75.853	23.739	2023	7.4	1380	0	407	75	0.62	38	53	0.02	391	46	67	65	0	0	0	2.8
36	Madhya Pradesh	Agar Malwa	Amla	76.104	23.853	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	0
37	Madhya Pradesh	Agar Malwa	Nalkheda	76.244	23.836	2023	7.56	935	0	290	127	0.21	20	13	0	421	139	18	17	1	0.02	0	0
38	Madhya Pradesh	Agar Malwa	Guradi Bangla	76.155	24.08	2023	7.6	1334	0	511	112	0.67	10	83	0.01	550	119	61	48	1	0.02	0	3.49
39	Madhya Pradesh	Agar Malwa	Soyat	76.174	24.188	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.87	4.31
40	Madhya Pradesh	Agar Malwa	Susner New	76.101	23.944	2023	7.6	1100	0	394	105	0.24	15	68	0	347	129	6	90	1	0.01	0	1.25
41	Madhya Pradesh	Alirajpur	Alirajpur	74.3525	22.3094	2023	7.62	1045	0	445	115	0.82	2	5	0	430	106	40	45	5	0.04	0	6.92
42	Madhya Pradesh	Alirajpur	Borkua	74.3422	22.2236	2023	8.11	546	0	299	17	1.09	4	3	0	170	46	13	56	2	0.23	0	2.13
43	Madhya Pradesh	Alirajpur	Badaguda	74.5172	22.4297	2023	7.97	888	0	451	32	1.6	3	25	0	310	84	24	63	4	0.08	0	3.3
44	Madhya Pradesh	Alirajpur	Kathiwara	74.1503	22.4808	2023	8.07	635	0	275	52	0.6	5	6	0	185	26	29	61	2	0.04	0	1.13
45	Madhya Pradesh	Anuppur	Anuppur New	81.7036	23.1158	2023	6.99	389	0	189	17	0.54	9	2	0	135	34	12	28	1	0.02	0.9	0
46	Madhya Pradesh	Anuppur	Barbaspur	81.9431	23.0992	2023	7.86	308	0	55	57	0.14	2	24	0	100	26	9	23	1	0.02	0	0
47	Madhya Pradesh	Anuppur	Funga	81.823	23.183	2023	7	804	0	85	157	0.08	27	135	0	225	56	21	92	5	0.04	0	0
48	Madhya Pradesh	Anuppur	Sajah	81.6075	23.0267	2023	7.37	845	0	384	67	0.19	23	4	0	350	72	41	39	3	0.06	0	0.97
49	Madhya Pradesh	Anuppur	Deohara	81.5972	23.1431	2023	7.3	536	0	177	72	0.3	28	15	0	190	52	15	46	1	0.04	0.62	0
50	Madhya Pradesh	Anuppur	Dhangaon New	81.8467	23.0433	2023	7.51	245	0	85	32	1.06	5	11	0	55	20	1	36	1	0.02	0.62	0
51	Madhya Pradesh	Anuppur	Jamudi	81.6328	23.0664	2023	7.34	532	0	275	22	1.45	7	7	0	190	42	21	35	3	0.24	0	1.12
52	Madhya Pradesh	Anuppur	Lapta	81.8894	22.9836	2023	7.36	788	0	262	85	0.74	37	26	0	245	46	32	69	2	0.01	0	0
53	Madhya Pradesh	Anuppur	Murra Tola	81.793	23.056	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	0
54	Madhya Pradesh	Anuppur	Devgawan	81.8961	23.2436	2023	7.66	843	0	238	107	0.57	35	3	0	345	90	29	22	1	0.03	0.94	2.45
55	Madhya Pradesh	Anuppur	Jhiriyatola New	82.1039	23.2114	2023	7.32	767	0	85	162	0.17	50	32	0	175	42	17	96	2	0	0	0
56	Madhya Pradesh	Anuppur	Kotma	81.9786	23.1958	2023	7.21	503	0	98	90	0.21	14	46	0	175	44	16	41	1	0.02	0	0
57	Madhya Pradesh	Anuppur	Amarkantak	81.7611	22.6744	2023	6.89	136	0	31	15	0.05	2	25	0	65	10	10	2	0	0.08	0	0
58	Madhya Pradesh	Anuppur	Basaniha	81.608	22.931	2023	7.43	612	0	299	27	0.21	6	10	0	255	68	21	23	1	0.11	0	0
59	Madhya Pradesh	Anuppur	Podki	81.729	22.784	2023	7.78	512	0	226	32	0.07	22	5	0	170	40	17	39	3	0.03	0	0
60	Madhya Pradesh	Anuppur	Noonghati	81.6881	22.8364	2023	7.56	235	0	92	25	0.32	3	5	0	95	22	10	12	0	0.07	0	0
61	Madhya Pradesh	Anuppur	Pipraha New	81.6372	22.8611	2023	7.62	623	0	311	32	0.14	17	2	0	265	44	38	22	7	0.12	0	0
62	Madhya Pradesh	Ashok Nagar	Barkheda	77.806	24.571	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	1.03
63	Madhya Pradesh	Ashok Nagar	Sankat Mochan	77.731	24.615	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	1.81
64	Madhya Pradesh	Ashok Nagar	Semrisahabad	77.563	24.628	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.04	0.85	1.59
65	Madhya Pradesh	Ashok Nagar	Shadora	77.59	24.62	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	0
66	Madhya Pradesh	Ashok Nagar	Chanderi	78.136	24.712	2023	7.67	1188	0	445	132	0.35	2	35	0	190	46	18	186	4	0.01	4.33	0
67	Madhya Pradesh	Ashok Nagar	Dhakoni	77.858	24.763	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.12	0	0
68	Madhya Pradesh	Ashok Nagar	Isagarh	77.88	24.842	2023	7.85	323	0	153	20	0.42	4	2	0	55	18	2	49	4	2.45	0	0
69	Madhya Pradesh	Ashok Nagar	Pachlana	77.803	24.781	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	1.82
70	Madhya Pradesh	Ashok Nagar	Saraskheri	77.789	24.736	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	2.16
71	Madhya Pradesh	Ashok Nagar	Shankarpur	77.921	24.755	2023	7.47	384	0	134	37	0.2	5	19	0	125	22	17	28	4	0.01	0	0
72	Madhya Pradesh	Ashok Nagar	Athaikhera	77.816	24.43	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0.99	4.78
73	Madhya Pradesh	Ashok Nagar	Bahadurpur	77.969	24.342	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	3.3
74	Madhya Pradesh	Ashok Nagar	Damdama	77.875	24.366	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	0
75	Madhya Pradesh	Ashok Nagar	Khalilpur	78.088	24.559	2023	7.94	714	0	262	85	0.42	9	18	0	275	64	28	42	9	2.47	0	0
76	Madhya Pradesh	Ashok Nagar	Mungaoli	78.109	24.403	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	1.29
77	Madhya Pradesh	Ashok Nagar	Sahrai	78.102	24.529	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.67	0
78	Madhya Pradesh	Ashok Nagar	Sehpura Chak	78.1	24.453	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0.58	1.34
79	Madhya Pradesh	Balaghat	Baihar1	80.551	22.104	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.05	0	1.81
80	Madhya Pradesh	Balaghat	Bhaisanghat	80.714	22.183	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.13	0	0
81	Madhya Pradesh	Balaghat	Garhi New	80.7933	22.2322	2023	7.56	454	0	183	37	0.58	8	6	0	135	22	19	42	3	0.39	0	0
82	Madhya Pradesh	Balaghat	Jawaditula	80.871	22.236	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.28	0	0
83	Madhya Pradesh	Balaghat	Mukki	80.672	22.154	2023	7.65	345	0	165	25	0.48	2	3	0.2	125	32	11	24	2	0.2	0	0
84	Madhya Pradesh	Balaghat	Parsatola	80.546	22.012	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.9	0	0
85	Madhya Pradesh	Balaghat	Samnapur	80.49	21.969	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.33	0	0
86	Madhya Pradesh	Balaghat	Supkhar	80.937	22.189	2023	7.55	342	0	153	25	0.37	2	3	0	100	32	5	28	3	0.06	0.58	0
87	Madhya Pradesh	Balaghat	Balaghat	80.184	21.813	2023	7.6	693	0	305	57	0.43	6	5	0	245	72	16	48	2	2.2	0.8	0
88	Madhya Pradesh	Balaghat	Kanki	80.152	21.832	2023	7.96	839	0	122	187	0.37	9	3	0	245	62	22	65	2	0.09	0	0
89	Madhya Pradesh	Balaghat	Lamta1	80.125	22.142	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	1.04	0.49	17.23
90	Madhya Pradesh	Balaghat	Magardarta	80.125	21.966	2023	7.73	711	0	305	50	1.14	22	19	0	265	76	18	46	2	0.09	0	2.69
91	Madhya Pradesh	Balaghat	Saleteka New	80.225	21.705	2023	7.59	345	0	153	25	0.21	4	3	0.1	130	32	12	19	3	0.62	0	1.97
92	Madhya Pradesh	Balaghat	Birsa	80.7175	22.0442	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.06	0	0
93	Madhya Pradesh	Balaghat	Damoh2	80.795	21.896	2023	7.55	244	0	98	22	0.23	4	2	0	75	24	4	22	3	0	0	0
94	Madhya Pradesh	Balaghat	Mohagaon	80.681	22.052	2023	7.57	1056	0	268	130	0.36	54	84	0	365	80	40	78	2	1.15	0	1.1
95	Madhya Pradesh	Balaghat	Saletekhri	80.81	21.781	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.71	0.47	0
96	Madhya Pradesh	Balaghat	Bonkatta	79.763	21.606	2023	7.86	1030	0	323	137	0.66	60	8	0.1	310	100	15	106	3	0.1	0	14.56
97	Madhya Pradesh	Balaghat	Garraghoda	79.786	21.636	2023	7.33	612	0	317	20	0.54	6	2	0	220	56	19	42	2	1.71	0	0
98	Madhya Pradesh	Balaghat	Katangi	79.803	21.771	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.08	0	3.71
99	Madhya Pradesh	Balaghat	Katedhara	79.797	21.714	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.04	0	13.14
100	Madhya Pradesh	Balaghat	Miragpur	79.839	21.631	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.06	0	1.92
101	Madhya Pradesh	Balaghat	Rampalli	80.017	21.664	2023	7.66	535	0	189	62	0.5	32	13	0	195	50	17	42	3	0.2	0	0.74
102	Madhya Pradesh	Balaghat	Bhanegaon	80.408	21.551	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	2.14	0.55	0
103	Madhya Pradesh	Balaghat	Kirnapur	80.329	21.626	2023	7.54	978	0	293	100	0.46	80	11	0	200	70	6	134	0	0.1	0	1.4
104	Madhya Pradesh	Balaghat	Rajegaon	80.25	21.631	2023	7.48	974	0	433	62	0.54	30	2	0.1	215	52	21	128	4	0.06	0	3.5
105	Madhya Pradesh	Balaghat	Kanjai	79.986	22.026	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.07	0	12.41
106	Madhya Pradesh	Balaghat	Katang Tola	80.047	21.948	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.14	0.6	0
107	Madhya Pradesh	Balaghat	Baghatola	80.627	21.398	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.74	0.83	0
108	Madhya Pradesh	Balaghat	Deverbeli	80.66	21.624	2023	7.34	674	0	268	50	0.4	40	4	0	235	48	28	51	3	0.81	0.42	0
109	Madhya Pradesh	Balaghat	Paldongri	80.488	21.471	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.86	0	0.74
110	Madhya Pradesh	Balaghat	Bagholi	80.369	22.142	2023	7.07	502	0	165	25	0.32	8	70	0	145	40	11	49	1	0.18	0	0
111	Madhya Pradesh	Balaghat	Khurmundi	80.481	22.125	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.34	0	0
112	Madhya Pradesh	Balaghat	Laugur	80.352	21.93	2023	7.56	512	0	262	25	0.36	2	4	0	125	34	10	65	1	0	0.79	0
113	Madhya Pradesh	Balaghat	Paraswara	80.301	22.176	2023	7.68	578	0	244	25	0.56	12	39	0	230	64	17	29	2	0	5.24	0
114	Madhya Pradesh	Balaghat	Rangpatbaba	80.217	22.153	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	1.43	0.9	0
115	Madhya Pradesh	Balaghat	Amai	79.952	21.676	2023	7.77	1028	0	305	125	1.23	60	9	0	400	112	29	49	2	0.04	0	3.52
116	Madhya Pradesh	Balaghat	Kochwahi	79.929	21.79	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.99	0	0.74
117	Madhya Pradesh	Balaghat	Newargaon	80.046	21.811	2023	7.45	1408	0	397	237	1.05	50	2	0.2	465	130	34	123	3	0.35	0.44	1.72
118	Madhya Pradesh	Balaghat	Waraseoni1	80.052	21.763	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0.55	0
119	Madhya Pradesh	Barwani	Niwali2	74.9233	21.6825	2023	7.27	1494	0	427	197	0.11	47	115	0	510	112	56	122	1	-	-	-
120	Madhya Pradesh	Barwani	Niwali1	74.923	21.683	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	0
121	Madhya Pradesh	Barwani	Donwaha	74.7514	21.6414	2023	8.01	839	0	207	87	0.05	27	75	0	310	48	46	46	1	0.09	0.44	0
122	Madhya Pradesh	Barwani	Pansemal	74.7122	21.6683	2023	7.84	1043	0	275	117	0.05	29	107	0	405	64	60	46	2	0.03	0.44	0
123	Madhya Pradesh	Barwani	Balsamund	75.175	21.809	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.05	0	0
124	Madhya Pradesh	Barwani	Palsud	74.965	21.823	2023	7.61	973	0	250	110	0.05	32	42	0	230	68	15	102	2	0.09	0	0
125	Madhya Pradesh	Barwani	Rajpur	75.136	21.936	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.06	0.52	1.06
126	Madhya Pradesh	Barwani	Sendhwa	75.103	21.694	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	0
127	Madhya Pradesh	Barwani	Baruphatak	75.303	21.981	2023	8.29	901	0	415	65	0.16	27	18	0.1	370	84	39	53	3	0.04	0	0
128	Madhya Pradesh	Barwani	Borlai	75.002	22.039	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.13	0	0
129	Madhya Pradesh	Betul	Sasundra	78.092	21.847	2023	7.7	612	0	281	25	0.05	20	13	0	225	64	16	42	2	0.16	0	0
130	Madhya Pradesh	Betul	Gujarmaal	77.946	21.63	2023	8.23	734	0	256	97	0.05	13	7	0	270	64	27	44	2	0.03	0	0
131	Madhya Pradesh	Betul	Betul1	77.927	21.86	2023	7.79	1023	0	262	190	0.11	20	2	0	510	74	79	13	3	0.22	0	0
132	Madhya Pradesh	Betul	Gadha	77.748	21.915	2023	7.8	945	0	409	77	0.57	8	14	0	451	108	44	25	2	0.01	0	1.73
133	Madhya Pradesh	Betul	Khedi	77.803	21.857	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	12.23
134	Madhya Pradesh	Betul	Kolgaon	77.894	21.769	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	0
135	Madhya Pradesh	Betul	Thapa	78.005	21.855	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.56	0	0.09
136	Madhya Pradesh	Betul	Bhainsdehi1	77.637	21.644	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
137	Madhya Pradesh	Betul	Gudagaon	77.71	21.592	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	0
138	Madhya Pradesh	Betul	Jhallar	77.743	21.726	2023	7.91	1059	0	311	182	0.05	5	34	0	375	92	35	85	2	0.01	0	0
139	Madhya Pradesh	Betul	Kotal Kund	77.658	21.463	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	0
140	Madhya Pradesh	Betul	Sanwal Medha	77.699	21.514	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.28	0	0
141	Madhya Pradesh	Betul	Chirapatala	77.5	22.106	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	0
142	Madhya Pradesh	Betul	Jogli	77.701	21.975	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	9.59
143	Madhya Pradesh	Betul	Ghoradongri	78.005	22.121	2023	7.62	986	0	323	105	0.8	32	34	0.1	225	64	16	124	6	-	-	-
144	Madhya Pradesh	Betul	Sarni	78.143	22.118	2023	7.56	887	0	226	135	0.13	80	22	0.4	330	102	18	69	2	0.01	0	0
145	Madhya Pradesh	Betul	Ghatpiparia	78.519	21.882	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	0
146	Madhya Pradesh	Betul	Kapasia	78.415	21.831	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	0
147	Madhya Pradesh	Betul	Multaidw	78.256	21.775	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.9	0
148	Madhya Pradesh	Betul	Junapani	78.353	21.721	2023	7.88	986	0	519	22	0.05	20	2	0	425	130	24	42	2	0.02	0	0
149	Madhya Pradesh	Betul	Masod New	78.118	21.603	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	0
150	Madhya Pradesh	Betul	Pattan	78.266	21.651	2023	7.5	545	0	201	30	0.11	36	11	0	240	84	7	13	3	0.02	0	0
151	Madhya Pradesh	Betul	Bhonra	77.87	22.278	2023	7.71	642	0	232	62	0.05	15	20	0.2	195	24	33	66	2	0.52	0	10.32
152	Madhya Pradesh	Betul	Shahpur	77.904	22.189	2023	7.29	1023	0	220	205	0.14	17	18	0	425	124	28	46	2	0	0	1.55
153	Madhya Pradesh	Bhind	Ater	78.644	26.75	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
154	Madhya Pradesh	Bhind	Pidora	78.705	26.5458	2023	7.43	2125	0	299	417	0.32	38	151	0	470	104	51	260	2	0.07	1.67	7.11
155	Madhya Pradesh	Bhind	Kankura	78.8569	26.6269	2023	8.02	903	0	433	32	0.4	25	18	0.21	240	60	22	95	1	0.02	0	8.96
156	Madhya Pradesh	Bhind	Nahrakapura	78.942	26.637	2023	7.52	1589	0	512	197	0.92	42	22	0.11	265	68	23	238	1	0.13	0	9.02
157	Madhya Pradesh	Bhind	Bhagathar	78.492	26.344	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	6.02
158	Madhya Pradesh	Bhind	Bhirkhari	78.478	26.475	2023	7.58	1185	0	439	127	0.32	18	29	0.15	315	90	22	125	2	0.01	0.97	6.59
159	Madhya Pradesh	Bhind	Khader	78.484	26.368	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.44	3.29
160	Madhya Pradesh	Bhind	Mau	78.667	26.27	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	3.75
161	Madhya Pradesh	Bhind	Chirole	78.634	26.355	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	14.36
162	Madhya Pradesh	Bhind	Gormi	78.502	26.599	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	5.88
163	Madhya Pradesh	Bhind	Mehgaon	78.601	26.498	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
164	Madhya Pradesh	Bhind	Meroli	78.53	26.562	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
165	Madhya Pradesh	Bhind	Alampur	78.797	26.029	2023	7.9	3573	0	519	870	0.57	37	62	0.08	915	244	74	396	2	0.15	3.2	7.65
166	Madhya Pradesh	Bhind	Daboh	78.879	25.996	2023	7.99	850	0	378	30	0.64	45	19	0	185	42	19	109	0	0.01	0	3.02
167	Madhya Pradesh	Bhind	Dewri	78.903	26.081	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	4.97
168	Madhya Pradesh	Bhind	Ratanpura	78.825	25.968	2023	8.03	2045	0	909	157	1.17	24	18	0.24	265	70	22	345	1	0.43	0	0.79
169	Madhya Pradesh	Bhopal	Amlia	77.248	23.87	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	0
170	Madhya Pradesh	Bhopal	Berasia	77.431	23.623	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.07	0.42	0.82
171	Madhya Pradesh	Bhopal	Gunga	77.36	23.449	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.36	0	0
172	Madhya Pradesh	Bhopal	Nagirabad	77.256	23.794	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.06	0	1.94
173	Madhya Pradesh	Bhopal	Ramgarha	77.347	23.654	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	0.87
174	Madhya Pradesh	Bhopal	Suhaya Kala	77.51	23.744	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
175	Madhya Pradesh	Bhopal	Bairagarh	77.352	23.273	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.04	0	0.75
176	Madhya Pradesh	Bhopal	Balampurghati	77.542	23.397	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	1.17
177	Madhya Pradesh	Bhopal	Barkheda Pathani	77.475	23.214	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.09	1.04	2.35
178	Madhya Pradesh	Bhopal	Barkhera	77.468	23.231	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	2.3	0
179	Madhya Pradesh	Bhopal	Bilkhiria	77.581	23.254	2023	7.99	912	0	384	92	0.43	2	2	0	285	62	32	81	1	0.03	0	0.94
180	Madhya Pradesh	Bhopal	Chichli	77.376	23.209	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.22	0	0
181	Madhya Pradesh	Bhopal	Dig Bangla	77.404	23.278	2023	7.98	945	0	482	52	1.01	4	4	0	240	42	33	112	3	0.04	0.61	1.25
182	Madhya Pradesh	Bhopal	E- 2 Nursery	77.437	23.22	2023	7.72	606	0	323	32	0.45	3	8	0	205	54	17	56	5	0.05	0.92	0
183	Madhya Pradesh	Bhopal	Islamnagar	77.418	23.356	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
184	Madhya Pradesh	Bhopal	Lal Ghati	77.376	23.277	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.07	0	0
185	Madhya Pradesh	Bhopal	Nabibagh	77.404	23.308	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	1.57
186	Madhya Pradesh	Bhopal	Nipaniya Jaat	77.399	23.41	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	2.2	0.94
187	Madhya Pradesh	Bhopal	Piplani	77.475	23.214	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
188	Madhya Pradesh	Bhopal	Sarvar	77.3	23.156	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.05	0	0
189	Madhya Pradesh	Bhopal	Shahjahana Bad	77.398	23.266	2023	7.3	605	0	268	65	0.38	2	16	0.1	230	58	21	38	15	0.29	3.51	0
190	Madhya Pradesh	Bhopal	Shahpura	77.423	23.207	2023	7.76	895	0	409	62	0.31	5	20	0.2	305	70	32	69	2	0.36	0	0
191	Madhya Pradesh	Bhopal	South T T Nagar	77.407	23.231	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.91	0	1.66
192	Madhya Pradesh	Burhanpur	Burhanpur New	76.2336	21.3311	2023	8.13	1458	0	305	280	0.09	30	25	0	175	18	32	245	2	0.03	0	0
193	Madhya Pradesh	Burhanpur	Chandnidw	76.3506	21.4264	2023	7.49	1039	0	445	67	0.18	28	34	0	350	64	46	82	2	0.06	0	0
194	Madhya Pradesh	Burhanpur	Chapora	76.185	21.2008	2023	7.42	1472	0	421	170	0.05	25	137	0	565	178	29	88	1	0.03	0.47	0.81
195	Madhya Pradesh	Burhanpur	Dehnala	76.311	21.529	2023	7.55	650	0	336	12	0.36	6	22	0.2	240	50	28	41	5	0.01	0	0
196	Madhya Pradesh	Burhanpur	Ichhapur	76.1557	21.1508	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	0.82
197	Madhya Pradesh	Burhanpur	Jhiri	76.2664	21.5475	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.07	0	0
198	Madhya Pradesh	Burhanpur	Karkheda	76.4867	21.3369	2023	7.73	886	0	281	87	0.08	21	45	0	390	78	47	17	3	0.02	0	0
199	Madhya Pradesh	Burhanpur	Nepa Nagar	76.3936	21.4533	2023	7.36	802	0	305	62	0.05	13	20	0	320	70	35	32	1	0.02	0	0
200	Madhya Pradesh	Burhanpur	Pipalpani	76.6792	21.43	2023	7.79	1760	0	653	197	0.35	27	132	0	710	178	64	112	5	0.01	0	0
201	Madhya Pradesh	Burhanpur	Shekhpura	76.734	21.552	2023	7.58	937	0	354	102	0.15	10	10	0	340	86	30	56	1	0.05	0	0
202	Madhya Pradesh	Burhanpur	Tukai Thad	76.6533	21.4289	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.04	0	0
203	Madhya Pradesh	Chhatarpur	Sadwa	79.275	24.4775	2023	8.11	612	0	232	67	0.5	8	13	0	245	48	30	33	4	0.05	0.57	0
204	Madhya Pradesh	Chhatarpur	Sendpa	79.2528	24.5469	2023	7.98	715	0	372	20	0.38	10	6	0	295	42	46	32	1	0.01	0	0
205	Madhya Pradesh	Chhatarpur	Bijawar	79.4981	24.6503	2023	7.82	612	0	275	22	0.62	26	30	0.1	235	54	24	36	1	0.15	0	1.74
206	Madhya Pradesh	Chhatarpur	Gulganj	79.3689	24.6925	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.54	0	2.34
207	Madhya Pradesh	Chhatarpur	Motigarh	79.6692	24.6133	2023	7.57	245	0	110	15	0.23	4	5	0	95	30	5	12	2	0.07	0	0
208	Madhya Pradesh	Chhatarpur	Raipura	79.723	24.481	2023	7.76	588	0	250	37	0.54	3	31	0	220	52	22	36	1	0.51	0	4.53
209	Madhya Pradesh	Chhatarpur	Tapra Lahar	79.6097	24.5881	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.63	0	1.3
210	Madhya Pradesh	Chhatarpur	Amodha	79.3261	24.1994	2023	7.91	312	0	153	12	0.15	6	7	0	100	32	5	28	1	0.86	0	0
211	Madhya Pradesh	Chhatarpur	Buxwaha	79.2872	24.2486	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.05	0	1.12
212	Madhya Pradesh	Chhatarpur	Gadhoi	79.2272	24.2947	2023	7.56	545	0	189	77	0.49	2	4	0	225	58	19	24	6	0.69	0.85	1.13
213	Madhya Pradesh	Chhatarpur	Chhatarpur	79.5911	24.9	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	2.22
214	Madhya Pradesh	Chhatarpur	Issanagar	79.3847	24.8619	2023	8.09	1056	0	415	102	0.46	32	7	0.1	410	46	72	56	2	0.14	1.41	3.53
215	Madhya Pradesh	Chhatarpur	Kurri	79.72	24.8681	2023	8.16	598	0	250	20	0.69	50	7	0	180	28	27	56	1	0.38	0	3.47
216	Madhya Pradesh	Chhatarpur	Matgawan	79.4772	24.7978	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.05	0	2.83
217	Madhya Pradesh	Chhatarpur	Niwari1	79.6514	24.9964	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.05	0	45.55
218	Madhya Pradesh	Chhatarpur	Pipora Khurd	79.4808	24.85	2023	8.14	485	0	238	25	0.87	7	10	0	165	38	17	42	2	0.72	1.31	17.14
219	Madhya Pradesh	Chhatarpur	Gaurihar	80.1944	25.2683	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	7.82
220	Madhya Pradesh	Chhatarpur	Sarwai	80.2872	25.1861	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	1.39
221	Madhya Pradesh	Chhatarpur	Singhpur	80.2439	25.1278	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.18	0	4.41
222	Madhya Pradesh	Chhatarpur	Chandla	80.1944	25.0672	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	3.84
223	Madhya Pradesh	Chhatarpur	Lavkush Nagar	80.006	25.139	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.06	0	5.73
224	Madhya Pradesh	Chhatarpur	Maharajapur	79.726	25.021	2023	8.12	745	0	256	77	1.04	33	36	0	245	46	32	63	1	0.08	0	4.33
225	Madhya Pradesh	Chhatarpur	Nowgaon	79.45	25.0542	2023	8.02	705	0	232	85	1.06	36	41	0	235	34	36	66	4	0.04	0	10.87
226	Madhya Pradesh	Chhatarpur	Chandra Nagar	79.9589	24.75	2023	8.06	735	0	250	80	0.79	36	12	0	245	54	27	59	1	0.02	0	6.34
227	Madhya Pradesh	Chhatarpur	Ganj	79.7953	24.7919	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	16.51
228	Madhya Pradesh	Chhatarpur	Khajuraho	79.9311	24.8497	2023	7.68	910	0	256	137	0.4	26	5	0	350	36	63	41	1	0.03	0	5.01
229	Madhya Pradesh	Chhatarpur	Tatampur	79.8653	25.0447	2023	8.22	589	0	177	75	1.25	21	42	3.2	210	42	26	45	1	0.85	0	4.47
230	Madhya Pradesh	Chhindwara	Amarwara	79.171	22.301	2023	7.91	612	0	262	42	0.41	24	2	0	165	56	6	72	2	0	0.48	0
231	Madhya Pradesh	Chhindwara	Bangaon2	79.1319	22.2597	2023	7.71	945	0	317	70	0.46	50	67	0	345	90	29	65	3	0.09	0	0
232	Madhya Pradesh	Chhindwara	Banjari	79.132	22.26	2023	7.62	965	0	500	37	0.41	8	17	0	395	96	38	45	1	0.25	0	0
233	Madhya Pradesh	Chhindwara	Singhori	79.062	22.201	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.59	0	1.46
234	Madhya Pradesh	Chhindwara	Marka Handi	79.164	22.045	2023	7.9	924	0	354	62	0.52	48	47	0	325	104	16	65	2	0.21	1.2	0
235	Madhya Pradesh	Chhindwara	Thanvari Kunda	79.267	22.176	2023	7.82	1170	0	323	150	1	52	56	0	445	122	34	62	4	0.06	0.9	1.01
236	Madhya Pradesh	Chhindwara	Chhindwara	78.949	22.053	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.05	0	1.28
237	Madhya Pradesh	Chhindwara	Jamunia Ner	79.023	22.137	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.14	0.8	0.8
238	Madhya Pradesh	Chhindwara	Saonri2	78.7703	21.9647	2023	7.75	826	0	262	55	0.39	54	54	0.1	335	80	33	28	3	0.43	0	0
239	Madhya Pradesh	Chhindwara	Harraidw	79.221	22.613	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.13	1.1	0.3
240	Madhya Pradesh	Chhindwara	Sathiya	79.179	22.59	2023	7.6	472	0	177	40	0.3	28	5	0	145	36	13	48	3	0.09	0	0
241	Madhya Pradesh	Chhindwara	Surla	79.172	22.433	2023	8.09	1154	0	305	55	0.34	40	28	0.2	345	88	30	24	3	0.65	0	0
242	Madhya Pradesh	Chhindwara	Damua	78.469	22.194	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.89	1.3	0
243	Madhya Pradesh	Chhindwara	Jamai	78.595	22.196	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.33	0.9	0.9
244	Madhya Pradesh	Chhindwara	Goni	79.013	21.821	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.09	2.1	1.1
245	Madhya Pradesh	Chhindwara	Linga Rly.Stn.	78.938	21.963	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.24	0.9	0
246	Madhya Pradesh	Chhindwara	Sarangbheri	78.953	21.867	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.06	0	1.4
247	Madhya Pradesh	Chhindwara	Tansara Mal	78.898	21.862	2023	7.85	545	0	244	27	0.57	16	2	0	200	48	19	35	3	0.09	0	0
248	Madhya Pradesh	Chhindwara	Chaurai2	78.4794	21.6403	2023	8.03	610	0	262	30	0.52	44	12	0	245	62	22	35	1	0.33	0	0
249	Madhya Pradesh	Chhindwara	Chinchkheda	78.479	21.64	2023	7.25	719	0	305	37	0.53	60	3	0.3	215	50	22	75	5	0.03	0	0
250	Madhya Pradesh	Chhindwara	Chincholiwad	78.693	21.5	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.04	0.3	0
251	Madhya Pradesh	Chhindwara	Mohi	78.441	21.658	2023	7.83	777	0	366	25	0.79	24	18	0	295	70	29	45	6	0.09	1.3	0
252	Madhya Pradesh	Chhindwara	Pandurna	78.518	21.589	2023	7.37	335	0	140	17	0.37	14	11	0	120	44	2	25	2	0.15	2.1	1.2
253	Madhya Pradesh	Chhindwara	Rajna	78.639	21.54	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.37	1.1	0.9
254	Madhya Pradesh	Chhindwara	Sonapipri	78.803	22.143	2023	7.97	981	0	427	40	1.37	56	42	0.1	350	112	17	69	5	0.99	0.3	2.29
255	Madhya Pradesh	Chhindwara	Borgaon1	78.816	21.559	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.17	0	0.9
256	Madhya Pradesh	Chhindwara	Piplanarayanwar	78.7335	21.5919	2023	7.85	964	0	366	57	0.67	25	71	0	400	92	41	28	3	0.26	1.2	1.6
257	Madhya Pradesh	Chhindwara	Ramakona New	78.843	21.702	2023	8.09	898	0	458	17	0.65	16	22	0	285	66	29	77	2	0.42	0	1.5
258	Madhya Pradesh	Chhindwara	Sausar	78.806	21.655	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.55	0	1.42
259	Madhya Pradesh	Chhindwara	Chhindi	78.824	22.388	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.15	0	0
260	Madhya Pradesh	Chhindwara	Lahgudna	78.724	22.272	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.33	0.4	0
261	Madhya Pradesh	Chhindwara	Mahaljhir	78.574	22.609	2023	7.67	2875	0	683	457	1.54	160	85	0.4	745	210	54	323	2	0.37	0.6	0
262	Madhya Pradesh	Chhindwara	Renikhera	78.573	22.544	2023	8.06	960	0	500	37	1.46	34	7	0	270	64	27	105	7	0.49	0	0
263	Madhya Pradesh	Damoh	Batiyagarh	79.353	24.111	2023	7.31	875	0	350	87	0.45	28	37	0	312	87	23	66	2	0	0	7.35
264	Madhya Pradesh	Damoh	Abhana	79.537	23.705	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.33	2.59	0.84
265	Madhya Pradesh	Damoh	Damoh2	79.436	23.828	2023	7.18	940	0	339	124	0.39	59	4	0	370	111	23	66	1	0.05	0	13.6
266	Madhya Pradesh	Damoh	Hindoria	79.567	23.897	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	0.98
267	Madhya Pradesh	Damoh	Nohta	79.574	23.678	2023	7.34	1050	0	428	146	0.49	37	2	0	319	86	25	85	45	1.54	1.95	0
268	Madhya Pradesh	Damoh	Palar	79.469	23.929	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.47	0	5.2
269	Madhya Pradesh	Damoh	Gaisabad	79.827	24.236	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.65	0	2.2
270	Madhya Pradesh	Damoh	Hardua	79.671	24.175	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	5.76
271	Madhya Pradesh	Damoh	Bamhori	79.719	23.685	2023	7.26	860	0	345	89	0.48	29	40	0	339	82	32	59	2	0.03	0	2.74
272	Madhya Pradesh	Damoh	Jabera1	79.701	23.538	2023	7.65	538	0	296	10	0.46	14	9	0	258	62	25	11	1	-	-	-
273	Madhya Pradesh	Damoh	Khamaria	79.559	23.65	2023	7.05	295	0	121	32	0.28	7	4	0	109	28	10	18	11	0.21	0.65	2.16
274	Madhya Pradesh	Damoh	Bangaon New	79.517	24.007	2023	7.53	290	0	174	7	0.24	3	2	0	141	51	3	7	2	0.03	0	4.1
275	Madhya Pradesh	Damoh	Hardani Khurd	79.814	23.892	2023	7.42	640	0	344	20	0.47	15	27	0	269	71	22	31	4	-	-	-
276	Madhya Pradesh	Damoh	Kumhari	79.815	23.926	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.11	0	3.78
277	Madhya Pradesh	Damoh	Majhgawa	79.64	24.066	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	1.31
278	Madhya Pradesh	Damoh	Patera2	79.689	23.997	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.1	0.87	1.06
279	Madhya Pradesh	Damoh	Patharia	79.816	23.895	2023	7.41	1190	0	343	220	0.25	57	4	0	448	135	27	78	11	-	-	-
280	Madhya Pradesh	Damoh	Piparia Champat	79.404	23.955	2023	7.59	1030	0	457	64	0.03	77	5	0	459	106	47	44	6	0.93	0	0
281	Madhya Pradesh	Damoh	Dhangor	79.477	23.377	2023	7.28	880	0	353	89	0.45	29	36	0	354	78	39	58	2	0.01	0	2.66
282	Madhya Pradesh	Damoh	Pidaraikhera	79.5353	23.4414	2023	7.25	865	0	336	89	0.42	28	40	0	340	73	39	59	2	-	-	-
283	Madhya Pradesh	Damoh	Pindrhi Khera	79.534	23.443	2023	7.2	225	0	72	15	0.17	6	27	0	108	23	12	5	1	-	-	-
284	Madhya Pradesh	Damoh	Samnapur	79.386	23.313	2023	7.5	1200	0	362	144	0.85	56	62	0	295	71	28	100	89	0.11	2.12	0
285	Madhya Pradesh	Damoh	Tendukheda	79.539	23.396	2023	7.35	512	0	123	87	0.05	21	22	0	203	61	13	26	2	0.08	0	0
286	Madhya Pradesh	Datia	Pandokhar	78.796	25.89	2023	7.58	1185	0	439	127	0.32	18	29	0.15	315	90	22	125	2	0.15	0	4.2
287	Madhya Pradesh	Datia	Datia New	78.4614	25.6639	2023	7.9	3573	0	519	870	0.57	37	62	0.08	915	244	74	396	2	0.01	0	6.79
288	Madhya Pradesh	Datia	Dursadha	78.644	25.71	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	22.58
289	Madhya Pradesh	Datia	Imaliya	78.581	25.694	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.1	0	17.78
290	Madhya Pradesh	Datia	Ruduapura	78.501	25.778	2023	7.52	1589	0	512	197	0.92	42	22	0.11	265	68	23	238	1	0.06	1.08	42.68
291	Madhya Pradesh	Datia	Chhikau	78.523	25.825	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.04	0.44	21.01
292	Madhya Pradesh	Datia	Kasherua	78.781	26.238	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0.97	14.1
293	Madhya Pradesh	Datia	Tharet	78.657	26.011	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	19.9
294	Madhya Pradesh	Dewas	Bagli1	76.347	22.639	2023	7.72	573	0	277	22	0.26	20	5	0	255	65	23	16	0	0.02	0	0
295	Madhya Pradesh	Dewas	Bamohri	76.275	22.709	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	0.74
296	Madhya Pradesh	Dewas	Bhikupura	76.339	22.539	2023	7.85	1137	0	407	137	0.62	42	5	0	363	61	51	93	3	0.01	0.51	1.49
297	Madhya Pradesh	Dewas	Karnawad	76.229	22.73	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0.45	0.78
298	Madhya Pradesh	Dewas	Matmore New	76.379	22.717	2023	8.07	671	0	234	72	0.24	33	2	0	240	45	31	40	3	0.01	0	0
299	Madhya Pradesh	Dewas	Nevri	76.25	22.858	2023	7.69	1661	0	530	190	0.35	100	1	0	706	125	95	60	0	0.02	0	1.35
300	Madhya Pradesh	Dewas	Pipri	76.278	22.399	2023	7.86	1537	0	487	167	0.73	82	82	0.41	515	104	62	86	35	0.04	0.87	3.32
301	Madhya Pradesh	Dewas	Punjapura	76.37	22.546	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	0.97
302	Madhya Pradesh	Dewas	Udainagardw	76.204	22.538	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.73	2.7
303	Madhya Pradesh	Dewas	Bhesuni	75.993	23.233	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.1	0	4.37
304	Madhya Pradesh	Dewas	Dewas	76.068	22.974	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	0
305	Madhya Pradesh	Dewas	Bijawad	76.572	22.699	2023	7.64	1005	0	407	80	0.79	65	24	0	431	76	58	44	1	0.07	0	0
306	Madhya Pradesh	Dewas	Kannod	76.751	22.664	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.04	0	1.51
307	Madhya Pradesh	Dewas	Kantaphor	76.566	22.576	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.68	1.15
308	Madhya Pradesh	Dewas	Kusumania	76.76	22.768	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0.45	0
309	Madhya Pradesh	Dewas	Satwas New	76.682	22.534	2023	8.03	1745	0	628	207	1.85	80	67	0	510	49	94	200	1	0.04	0	9.66
310	Madhya Pradesh	Dewas	Dhayali	76.8	22.546	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	1.34
311	Madhya Pradesh	Dewas	Pipilianankar	77.001	22.586	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.06	0.42	5.11
312	Madhya Pradesh	Dewas	Bhonrasa	76.207	22.988	2023	8.04	1073	0	437	92	0.34	65	50	0	505	45	95	35	1	0.02	0	1.21
313	Madhya Pradesh	Dhar	Badnawar New	75.246	23.019	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.74	2.29
314	Madhya Pradesh	Dhar	Chayan	75.137	23.025	2023	8.09	712	0	268	35	0.65	42	41	0	215	44	26	67	3	0.04	0.62	0.82
315	Madhya Pradesh	Dhar	Kanwan New	75.258	22.87	2023	8.02	1686	0	122	455	1.71	80	2	0	300	70	30	245	2	0.02	0	1.35
316	Madhya Pradesh	Dhar	Bagh New	74.796	22.363	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	1.06	4.02
317	Madhya Pradesh	Dhar	Dahi	74.6037	22.1164	2023	8.12	689	0	244	60	0.56	20	29	0	275	52	35	35	2	0.04	0.46	0
318	Madhya Pradesh	Dhar	Dhar	75.318	22.591	2023	8.11	1012	0	262	125	0.21	60	45	0.1	415	76	55	41	2	0.01	0	0.81
319	Madhya Pradesh	Dhar	Lunera	75.3363	22.5865	2023	8.03	926	0	354	55	0.8	50	48	0.1	290	64	32	78	5	0.01	0.41	1.04
320	Madhya Pradesh	Dhar	Sadalpur	75.4225	22.7247	2023	7.89	1155	0	323	150	0.63	90	46	0	360	84	36	114	3	0.02	0.44	1.45
321	Madhya Pradesh	Dhar	Dhamnod	75.473	22.214	2023	7.33	945	0	317	112	0.44	30	5	0	265	54	32	95	3	0.04	1.06	1.68
322	Madhya Pradesh	Dhar	Dharampuri1	75.347	22.153	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.89	2.36
323	Madhya Pradesh	Dhar	Gujri1	75.5	22.321	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.45	0.79
324	Madhya Pradesh	Dhar	Awaldaman New	75.0742	22.3233	2023	7.98	765	0	305	25	0.28	40	75	0	325	52	47	32	2	0.01	0.51	1.27
325	Madhya Pradesh	Dhar	Gandhwani	75.005	22.336	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	1.11
326	Madhya Pradesh	Dhar	Kabarwa	74.9678	22.2728	2023	7.77	615	0	238	41	0.44	26	31	0	260	52	32	25	2	0.01	0.51	0
327	Madhya Pradesh	Dhar	Zeerabad	75.07	22.398	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.34	0.79	1.17
328	Madhya Pradesh	Dhar	Dehari	74.916	22.288	2023	8.06	1502	0	384	225	1.5	72	36	0	200	34	28	256	7	0.01	1.3	2.09
329	Madhya Pradesh	Dhar	Palasi	74.661	22.228	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.05	0.76	0.77
330	Madhya Pradesh	Dhar	Manawar	75.093	22.236	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0.5	0.89
331	Madhya Pradesh	Dhar	Singhana	74.969	22.188	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0.96	0
332	Madhya Pradesh	Dhar	Mandu	75.398	22.347	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	1.67	0
333	Madhya Pradesh	Dhar	Dhulsar	74.869	22.205	2023	7.9	488	0	146	50	0.12	24	25	0	150	24	22	42	3	0.01	0	0
334	Madhya Pradesh	Dhar	Pipalya	74.875	22.134	2023	8.02	1523	0	256	200	0.23	160	112	0	600	112	78	82	2	0.02	0.53	0.98
335	Madhya Pradesh	Dhar	Amjhira	75.123	22.556	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.6	0.74
336	Madhya Pradesh	Dhar	Julana	74.989	22.781	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.46	0
337	Madhya Pradesh	Dhar	Rajod	75.067	22.954	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	0
338	Madhya Pradesh	Dhar	Sardapur	74.974	22.668	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.41	0
339	Madhya Pradesh	Dhar	Rawatpura	75.2407	22.1736	2023	8.02	777	0	293	85	0.34	12	4	0	250	46	33	62	2	0.03	0.53	0
340	Madhya Pradesh	Dindori	Amarpur	80.9613	22.787	2023	7.12	858	0	250	104	0.13	32	34	0	335	98	22	38	10	0.01	0	0
341	Madhya Pradesh	Dindori	Salaiya	80.947	22.91	2023	7.35	453	0	201	25	0.08	8	1	0	95	24	9	58	1	0.02	0.45	0
342	Madhya Pradesh	Dindori	Bijhauri	81.2307	22.862	2023	7.37	847	0	214	161	0.09	12	32	0	295	78	24	68	3	0	0	0
343	Madhya Pradesh	Dindori	Sagar Tola	81.2919	22.8283	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
344	Madhya Pradesh	Dindori	Dindori	81.092	22.933	2023	7.42	812	0	360	62	0.17	5	10	0	375	106	27	17	2	0.22	0	0
345	Madhya Pradesh	Dindori	Kudha	81.1663	22.894	2023	7.26	900	0	275	131	0.05	18	9	0	380	94	35	40	2	0.02	0	0
346	Madhya Pradesh	Dindori	Vikrampur1	80.907	23.077	2023	7.41	795	0	366	42	0.18	14	1	0	340	90	28	28	2	0.21	0	0
347	Madhya Pradesh	Dindori	Karanjiya	81.621	22.711	2023	7.13	635	0	342	15	0.29	8	2	0	295	78	24	15	1	0.04	0	0
348	Madhya Pradesh	Dindori	Patangarh	81.4794	22.746	2023	7.15	718	0	299	30	0.05	28	14	0	330	76	34	11	1	0	0	0
349	Madhya Pradesh	Dindori	Harra	80.7954	22.879	2023	7.22	389	0	201	10	1.27	5	5	0	160	38	16	18	1	0.1	0	0
350	Madhya Pradesh	Dindori	Katangi1	80.626	23.126	2023	6.97	423	0	195	22	0.2	12	9	0	185	48	16	15	1	0.08	0	0
351	Madhya Pradesh	Dindori	Shahpura Depot	80.695	23.183	2023	7.12	602	0	293	22	0.12	15	10	0	280	80	19	10	2	0.02	0	0
352	Madhya Pradesh	Dindori	Shahpura2	80.701	23.183	2023	7.09	1009	0	384	99	0.12	12	19	0	335	84	30	76	1	0.02	0	0
353	Madhya Pradesh	Guna	Aron	77.378	24.438	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.17	0	1.34
354	Madhya Pradesh	Guna	Rampur-I	77.448	24.308	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	1.08
355	Madhya Pradesh	Guna	Akoda	77.19	24.865	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.28	0.44	0
356	Madhya Pradesh	Guna	Bamori New	77.139	24.853	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	1.25
357	Madhya Pradesh	Guna	Berkheri	77.184	24.628	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.04	0	0.83
358	Madhya Pradesh	Guna	Suhaya New	77.124	24.691	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	0
359	Madhya Pradesh	Guna	Badaud New	77	24.409	2023	8.02	915	0	445	27	1.01	9	50	0	120	34	9	158	1	0.01	0	1.53
360	Madhya Pradesh	Guna	Binaganj	77.032	24.188	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.26	0	0
361	Madhya Pradesh	Guna	Khatkiya	77.103	24.33	2023	7.55	725	0	281	55	0.46	8	2	0	280	50	38	25	1	0.04	0	1.03
362	Madhya Pradesh	Guna	Penchi	77.01	24.136	2023	7.8	1670	0	323	355	0.53	8	5	0.7	675	170	61	52	3	0.02	0.54	1.85
363	Madhya Pradesh	Guna	Jaitadongar	77.336	24.531	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0.45	3.8
364	Madhya Pradesh	Guna	Mahugarha	77.259	24.612	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.16	0	0.97
365	Madhya Pradesh	Guna	Singwasa	77.364	24.65	2023	7.69	894	0	311	122	0.66	6	5	0	240	34	38	94	3	0.06	0	1.4
366	Madhya Pradesh	Guna	Amlia	77.197	24.212	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	3.01
367	Madhya Pradesh	Guna	Gunjari	77.264	23.911	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.05	0	1.17
368	Madhya Pradesh	Guna	Janjali	77.121	24.362	2023	8.07	1180	0	458	115	0.66	8	3	0	235	44	30	142	5	0.35	0	0
369	Madhya Pradesh	Guna	Khairai	77.278	24.419	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.23	0	0.93
370	Madhya Pradesh	Guna	Maksudangarh	77.258	24.061	2023	7.85	732	0	378	32	0.39	9	23	0	165	52	9	102	0	0.06	0.55	1.13
371	Madhya Pradesh	Guna	Pipaliya	77.159	24.309	2023	7.96	680	0	360	15	0.63	8	25	0	225	28	38	65	1	0.05	0.53	3.33
372	Madhya Pradesh	Gwalior	Bajna	77.9416	25.8506	2023	7.1	758	0	354	27	0.72	24	15	0	250	76	15	55	4	0.07	0	2.64
373	Madhya Pradesh	Gwalior	Deorikala	77.9842	25.7833	2023	7.45	1570	0	506	188	1.1	45	39	0.14	340	92	27	201	4	0.01	0	1.68
374	Madhya Pradesh	Gwalior	Dongarpur	77.964	25.822	2023	7	3642	0	817	537	0.56	66	260	0	1010	316	54	351	3	0	0	53.87
375	Madhya Pradesh	Gwalior	Harsibandh	77.929	25.762	2023	7.55	495	0	177	32	0.36	27	25	0	125	28	13	53	2	0	0	9.23
376	Madhya Pradesh	Gwalior	Makoda	78.256	26.036	2023	7.16	1301	0	445	141	0.18	39	30	0	320	82	28	148	4	0.01	0	163.2
377	Madhya Pradesh	Gwalior	Masoorpur New	78.244	25.83	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	17.05
378	Madhya Pradesh	Gwalior	Aron	77.931	25.952	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	4.1
379	Madhya Pradesh	Gwalior	Beelpura	78.0471	26.2499	2023	7.27	1092	0	360	116	0.49	34	39	0	355	86	34	85	1	0.01	0	6.79
380	Madhya Pradesh	Gwalior	Behrata	78.096	26.292	2023	7.29	2596	0	702	408	0.25	55	43	0	475	152	23	372	3	0.01	0.82	6.84
381	Madhya Pradesh	Gwalior	Charai Shyampur	77.831	25.975	2023	7.2	1496	0	415	181	0.41	42	109	0	430	104	41	145	3	0.15	0	26.61
382	Madhya Pradesh	Gwalior	Ghantigaon	77.9333	26.05	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	55.03
383	Madhya Pradesh	Gwalior	Mohna	77.777	25.897	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0.89	0
384	Madhya Pradesh	Gwalior	Prithvi Ka Pura	78.0926	26.2076	2023	7.5	350	0	122	27	0.86	21	12	0.14	110	28	10	28	2	0.01	0	6.73
385	Madhya Pradesh	Gwalior	Suro	78.0417	26.2499	2023	7.8	3590	0	964	606	0.45	64	54	0	825	196	81	444	1	0.01	2.66	5.33
386	Madhya Pradesh	Gwalior	Tighara	78.1513	26.2131	2023	7.37	721	0	311	42	0.35	25	13	0	230	56	22	58	1	0.01	0	6.8
387	Madhya Pradesh	Gwalior	Aarauli	78.455	26.16	2023	7.51	642	0	232	57	0.29	32	5	0	175	42	17	64	1	0.05	0	0
388	Madhya Pradesh	Gwalior	Bajrang Colony Dabka	78.433	26.154	2023	7.07	1160	0	360	161	0.7	23	22	0	330	86	28	113	2	0.01	0	0
389	Madhya Pradesh	Gwalior	Behat	78.543	26.174	2023	6.98	659	0	232	59	0.78	27	19	0.14	115	24	13	95	2	0.01	0	0
390	Madhya Pradesh	Gwalior	Ghosipura	78.2906	26.2757	2023	7.38	367	0	110	37	0.9	19	14	0	85	18	10	42	1	0.02	2.1	0
391	Madhya Pradesh	Gwalior	Jahangirpur	78.2906	26.2756	2023	7.29	3028	0	665	557	0.62	38	93	0	680	164	66	375	3	0.01	0	10.65
392	Madhya Pradesh	Gwalior	Maithana	78.2905	26.2902	2023	7.3	1747	0	683	166	1	28	34	0.11	310	90	21	255	3	0.01	0	3.25
393	Madhya Pradesh	Gwalior	Manpura	78.355	26.164	2023	8	968	0	360	82	0.85	34	26	0.26	320	74	33	69	4	0.03	1.61	3.27
394	Madhya Pradesh	Gwalior	Odpura	78.2687	26.2665	2023	7.29	441	0	153	45	0.26	16	11	0.16	135	32	13	38	1	2.06	1.13	0
395	Madhya Pradesh	Gwalior	Padampur Kheria	78.2687	26.2665	2023	7.3	2024	0	708	205	0.56	41	68	0.2	375	94	34	287	4	0.68	0	4.26
396	Madhya Pradesh	Harda	Handia	76.981	22.484	2023	8.1	1306	0	641	72	1.14	23	41	0	280	52	36	189	3	0.03	0	10.23
397	Madhya Pradesh	Harda	Hardadw	77.088	22.346	2023	7.69	1380	0	464	95	0.46	48	142	0	475	90	61	95	3	0.01	0	1.49
398	Madhya Pradesh	Harda	Masangaon	77.003	22.291	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	1.03
399	Madhya Pradesh	Harda	Chhipawaddw	76.877	22.155	2023	7.85	1110	0	482	45	0.07	23	24	0.2	190	42	21	153	4	0.01	0.56	0
400	Madhya Pradesh	Harda	Chhuri Khal	76.94	22.034	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.05	0	0
401	Madhya Pradesh	Harda	Mandla	76.947	22.219	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	1.03
402	Madhya Pradesh	Harda	Sonpura Colony	76.916	22.078	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.31	0	0.96
403	Madhya Pradesh	Harda	Chhidgaon	77.298	22.394	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	1.37
404	Madhya Pradesh	Harda	Dhanagao	77.2194	22.275	2023	7.61	650	0	348	15	0.14	6	18	0	250	62	23	36	2	0	0	1.87
405	Madhya Pradesh	Harda	Mohanpur1	77.23	22.255	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	5.62
406	Madhya Pradesh	Harda	Temagaon	77.321	22.298	2023	7.94	919	0	464	20	0.14	20	28	0	165	38	17	136	2	0.01	0	0
407	Madhya Pradesh	Harda	Timarni	77.223	22.374	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	1.2
408	Madhya Pradesh	Hoshangabad	Babaidw	77.939	22.7	2023	8.13	1145	0	549	70	0.05	14	21	0	415	98	41	78	8	0.75	0.63	1.63
409	Madhya Pradesh	Hoshangabad	Bagratawadw	77.993	22.629	2023	7.55	631	0	354	17	0.05	3	10	0	265	54	32	31	4	0.89	0	0
410	Madhya Pradesh	Hoshangabad	Baharpur	78.0736	22.7356	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.17	0	1.53
411	Madhya Pradesh	Hoshangabad	Dhongra	78.0828	22.6875	2023	7.29	901	0	360	85	0.06	20	13	0.1	340	62	45	61	3	0.03	0	1.98
412	Madhya Pradesh	Hoshangabad	Gurra New	77.918	22.63	2023	8.09	745	0	367	22	0.14	42	3	0.2	230	68	15	68	3	0.02	1.3	1.76
413	Madhya Pradesh	Hoshangabad	Dolariadw	77.639	22.626	2023	7.59	812	0	348	60	0.29	11	16	0	280	42	43	56	5	0.21	0	1.77
414	Madhya Pradesh	Hoshangabad	Raisalpur	77.758	22.669	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.11	0	1.83
415	Madhya Pradesh	Hoshangabad	Sanwalkhera	77.6767	22.65	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	1.96
416	Madhya Pradesh	Hoshangabad	Sonkhera	77.834	22.617	2023	8.03	794	0	433	27	0.5	10	2	0	260	64	24	72	4	0.01	0	2.65
417	Madhya Pradesh	Hoshangabad	Kesla	77.84	22.478	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	5.08
418	Madhya Pradesh	Hoshangabad	Pathrautadw	77.796	22.576	2023	7.49	845	0	342	72	0.06	28	21	0	280	54	35	69	5	0.43	0	3.8
419	Madhya Pradesh	Hoshangabad	Suktawa	77.843	22.408	2023	7.6	412	0	177	22	0.07	26	2	0	125	36	9	35	7	0.83	0	4.54
420	Madhya Pradesh	Hoshangabad	Matkuli	78.458	22.592	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	1.35
421	Madhya Pradesh	Hoshangabad	Pachmarhi	78.439	22.477	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.06	1.67	0
422	Madhya Pradesh	Hoshangabad	Sandia	78.355	22.913	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.15	0	3.46
423	Madhya Pradesh	Hoshangabad	Bhilatdeo	77.528	22.491	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0.79
424	Madhya Pradesh	Hoshangabad	Seonimalwa	77.466	22.448	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.14	0	1.89
425	Madhya Pradesh	Hoshangabad	Sohagpur	78.189	22.694	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.23	0	1.94
426	Madhya Pradesh	Hoshangabad	Karanpur	78.2194	22.72	2023	7.38	826	0	256	115	0.05	26	2	0	230	24	41	95	3	0.01	0.58	1.88
427	Madhya Pradesh	Indore	Depalpur	75.539	22.843	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	1.83
428	Madhya Pradesh	Indore	Rangwasa	75.57	22.744	2023	7.71	809	0	134	75	0.26	88	70	0	325	52	47	25	3	0.02	0	0
429	Madhya Pradesh	Indore	Ushapura	75.674	22.809	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.04	0	7.17
430	Madhya Pradesh	Indore	Bhil Paltan	75.834	22.696	2023	7.95	406	0	195	20	0.11	8	5	0	155	36	16	23	5	0.01	0	0
431	Madhya Pradesh	Indore	Bijalpur Masjid	75.834	22.666	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0.47	0
432	Madhya Pradesh	Indore	Cable Factory	75.836	22.713	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	3.2
433	Madhya Pradesh	Indore	Dudhiya	75.946	22.676	2023	7.77	1989	0	470	387	0.12	44	8	0.2	660	178	52	152	4	0.02	0	0.81
434	Madhya Pradesh	Indore	Footi Kothi	75.826	22.692	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	1.46
435	Madhya Pradesh	Indore	Gandhi Hall	75.866	22.72	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.5	0
436	Madhya Pradesh	Indore	Hatod	75.743	22.796	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.78	0
437	Madhya Pradesh	Indore	Mari Mata	75.85	22.738	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.54	0
438	Madhya Pradesh	Indore	Mushakhedi Phe	75.894	22.696	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.05	0.42	0
439	Madhya Pradesh	Indore	Polo Ground	75.854	22.739	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0.58	3.43
440	Madhya Pradesh	Indore	Prakash Nagar	75.879	22.698	2023	7.65	1012	0	445	75	0.21	28	2	0	380	112	24	65	3	0.02	0	2
441	Madhya Pradesh	Indore	Ranjeet Hanuman Temple	75.836	22.7	2023	7.98	478	0	232	25	0.11	8	2	0	205	42	24	14	3	0.01	0.47	0
442	Madhya Pradesh	Indore	Ravindra Nagar	75.893	22.722	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	1.87
443	Madhya Pradesh	Indore	Sajan Nagar	75.882	22.695	2023	7.86	1245	0	537	87	0.23	50	6	0	430	118	33	88	4	0.01	0	2.04
444	Madhya Pradesh	Indore	Soyabeen Research Centre	75.873	22.683	2023	7.89	852	0	317	85	0.69	44	15	0	175	34	22	123	4	0.01	0	1.89
445	Madhya Pradesh	Indore	Telephone Nagar	75.904	22.723	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	0.85
446	Madhya Pradesh	Indore	Mhow	75.762	22.549	2023	8.06	613	0	293	32	0.17	13	4	0.1	250	58	26	24	3	0.01	0	0
447	Madhya Pradesh	Indore	Nandpura	75.918	22.514	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.08	0.66	0
448	Madhya Pradesh	Indore	Sanwer	75.828	22.971	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	5.76
449	Madhya Pradesh	Jabalpur	Barela	80.055	23.096	2023	7.23	712	0	296	62	0.61	12	18	0	186	53	13	82	5	0.01	0	0
450	Madhya Pradesh	Jabalpur	Bargi1	79.874	22.989	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	0
451	Madhya Pradesh	Jabalpur	Gokalpur	79.985	23.19	2023	6.97	965	0	382	75	0.56	15	47	0	338	86	30	52	13	0.08	1.1	3.73
452	Madhya Pradesh	Jabalpur	Jain Dharamshala	79.886	23.153	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.06	3.15	0
453	Madhya Pradesh	Jabalpur	Kanch Ghar	79.96	23.176	2023	7.33	1189	0	394	152	0.35	14	63	0	343	67	43	112	6	0.01	0.77	0.77
454	Madhya Pradesh	Jabalpur	Kosham Ghat	80.0124	23.1063	2023	7.54	712	0	327	42	0.28	15	6	0	284	53	37	35	1	0.01	0.41	0.8
455	Madhya Pradesh	Jabalpur	Madan Mahal	79.916	23.158	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.05	0.7	4.47
456	Madhya Pradesh	Jabalpur	Manegaon1	79.913	23.078	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	0
457	Madhya Pradesh	Jabalpur	Nagar Nigam Complex	79.933	23.166	2023	7.43	1550	0	567	212	0.4	5	4	0	441	78	60	150	5	0.12	0.43	8.53
458	Madhya Pradesh	Jabalpur	Panchpedi	79.949	23.159	2023	7.33	840	0	388	47	0.2	14	10	0	319	114	8	42	3	0.01	0	0.78
459	Madhya Pradesh	Jabalpur	Panda Ki Madhia	79.892	23.158	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	3.26	0
460	Madhya Pradesh	Jabalpur	Raddi Chowki	79.942	23.181	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	2.7	1.74
461	Madhya Pradesh	Jabalpur	Railway Station	79.947	23.166	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.68	0.83
462	Madhya Pradesh	Jabalpur	Ranjhi	79.999	23.196	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.1	1.15	5.35
463	Madhya Pradesh	Jabalpur	Sadar Bazar	79.949	23.155	2023	6.96	676	0	320	30	0.28	28	1	0	270	53	33	35	2	0.03	0	0
464	Madhya Pradesh	Jabalpur	Umariyanew	80.073	23.2021	2023	7.57	502	0	259	15	0.28	12	3	0	211	45	24	13	8	0.02	0.66	0
465	Madhya Pradesh	Jabalpur	Bishanpura	80.249	23.229	2023	7.19	1210	0	487	105	0.34	18	46	0	431	96	46	75	1	0.01	0.45	0
466	Madhya Pradesh	Jabalpur	Kundam	80.346	23.219	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.1	0	0
467	Madhya Pradesh	Jabalpur	Bheraghat New	79.803	23.144	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.1	0.98	0.77
468	Madhya Pradesh	Jhabua	Jhabua1	74.59	22.771	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.47	1.08	0.93
469	Madhya Pradesh	Jhabua	Pitol	74.466	22.785	2023	7.85	2456	0	214	677	1.41	26	45	0	275	62	29	422	5	0.02	0.6	0
470	Madhya Pradesh	Jhabua	Meghnagar New	74.542	22.905	2023	8.08	945	0	366	100	0.79	32	5	0.1	170	26	26	140	3	0.01	0.71	1.43
471	Madhya Pradesh	Jhabua	Karwar	74.87	23.101	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.08	0.44	0
472	Madhya Pradesh	Jhabua	Petlabad	74.799	23.005	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.41	0.89
473	Madhya Pradesh	Jhabua	Sarangi	74.908	23.052	2023	7.86	689	0	281	37	0.07	15	49	0	275	58	32	32	2	0.02	0	0
474	Madhya Pradesh	Jhabua	Tikadimoti New	74.59	22.7708	2023	7.92	575	0	305	17	0.66	5	7	0	185	12	38	48	2	0.01	2.44	1.3
475	Madhya Pradesh	Jhabua	Thandla1	74.579	23.008	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	4.51
476	Madhya Pradesh	Katni	Piparia2	80.6986	23.8619	2023	7.48	891	0	311	67	0.52	22	70	0	275	60	30	72	4	0.19	0.52	5.21
477	Madhya Pradesh	Katni	Siloni	80.378	23.346	2023	7.54	912	0	342	65	0.49	14	75	0	335	32	62	52	5	0.02	0	9.76
478	Madhya Pradesh	Katni	Umariapan	80.2917	23.5217	2023	7.66	1003	0	336	90	0.21	23	140	0	375	106	27	74	2	0	0.57	0.86
479	Madhya Pradesh	Katni	Ganiyari	80.3986	23.8306	2023	7.44	1385	0	195	217	0.6	89	140	0	575	158	44	47	1	0.01	0.51	8.96
480	Madhya Pradesh	Katni	Katni1	80.399	23.831	2023	7.57	612	0	268	42	0.52	10	8	0	215	42	27	41	4	0.03	0	1.2
481	Madhya Pradesh	Katni	Bilhari New	80.2514	23.9028	2023	7.25	1611	0	360	235	2.46	76	140	0	575	150	49	112	7	0.01	0	5.74
482	Madhya Pradesh	Katni	Deogawan	80.2514	23.9028	2023	7.49	980	0	214	187	0.47	58	22	0	360	110	21	77	1	0.02	0	2.02
483	Madhya Pradesh	Katni	Rithi	80.142	23.909	2023	7.4	1567	0	421	212	1.46	67	24	0.1	525	130	49	95	7	0.02	0	9.74
484	Madhya Pradesh	Katni	Khitoli2	80.6986	23.8619	2023	7.49	484	0	214	25	0.38	7	17	0	205	44	23	19	2	0.01	0	1.42
485	Madhya Pradesh	Khandwa	Billod	76.7489	22.2028	2023	8.02	712	0	293	67	0.07	26	11	0.2	290	70	28	37	3	0.01	0	0
486	Madhya Pradesh	Khandwa	Chhegaon Makhan	76.218	21.832	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
487	Madhya Pradesh	Khandwa	Deshgaon New	76.179	21.902	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	0
488	Madhya Pradesh	Khandwa	Kusumbiya	76.198	21.689	2023	7.92	1256	0	287	177	0.16	67	89	0	380	66	52	123	1	-	-	-
489	Madhya Pradesh	Khandwa	Pandhana	76.227	21.699	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	0
490	Madhya Pradesh	Khandwa	Roshiya New	76.1664	21.9578	2023	7.88	1145	0	409	105	0.35	60	52	0	380	102	30	108	2	0.01	0	0
491	Madhya Pradesh	Khandwa	Bedia	76.744	21.97	2023	8.12	554	0	171	67	0.45	30	16	0.1	105	24	11	86	2	0.03	0	0
492	Madhya Pradesh	Khandwa	Bori Saray	76.817	22.006	2023	7.86	842	0	336	52	0.39	26	36	0	270	50	35	65	3	0.03	0	0
493	Madhya Pradesh	Khandwa	Chanera	76.698	21.962	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
494	Madhya Pradesh	Khandwa	Dagad Khedi	76.833	22.082	2023	7.96	442	0	207	22	0.35	16	3	0	150	46	9	35	3	0.01	0	0
495	Madhya Pradesh	Khandwa	Kalam Khurd	76.7108	21.8492	2023	8.09	686	0	256	40	0.12	28	34	0	210	38	28	61	2	0.01	0	0
496	Madhya Pradesh	Khandwa	Khalwa1	76.746	21.805	2023	7.57	1256	0	458	107	0.5	47	55	0	400	118	26	102	3	0	0	0
497	Madhya Pradesh	Khandwa	Khedi New	76.566	21.868	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	0
498	Madhya Pradesh	Khandwa	Jaswadi1	76.428	21.794	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	0
499	Madhya Pradesh	Khandwa	Jawar	76.448	21.93	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.08	0	0
500	Madhya Pradesh	Khandwa	Kahlari	76.464	21.983	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	0
501	Madhya Pradesh	Khandwa	Khandwadw	76.362	21.817	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.46	0
502	Madhya Pradesh	Khandwa	Rudhy Bhata	76.467	21.833	2023	7.9	856	0	375	72	0.38	15	3	0	285	56	35	65	2	0	0	0
503	Madhya Pradesh	Khandwa	Bairukheda	76.3053	21.7506	2023	7.83	826	0	262	55	0.4	58	68	0	295	52	40	56	2	0.01	0	0
504	Madhya Pradesh	Khandwa	Balwara1	76.516	21.7	2023	8.06	888	0	360	52	0.7	31	28	0	260	82	13	82	2	0.33	0	0
505	Madhya Pradesh	Khandwa	Borgaon Buzurg	76.325	21.609	2023	8.02	1089	0	390	72	0.24	48	78	0	340	102	21	98	3	0.02	0	0
506	Madhya Pradesh	Khandwa	Gurhi	76.574	21.639	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	0
507	Madhya Pradesh	Khandwa	Bangarda	76.462	22.145	2023	7.9	345	0	159	15	0.56	10	3	0	80	26	4	42	4	0.07	0	0
508	Madhya Pradesh	Khandwa	Daulatpur	76.391	22.232	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	0
509	Madhya Pradesh	Khandwa	Ghosali	76.131	22.158	2023	8.05	842	0	317	40	0.25	34	64	0.1	300	58	38	48	1	0.01	0	0
510	Madhya Pradesh	Khandwa	Gujar Khedi	76.301	22.197	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.48	0
511	Madhya Pradesh	Khandwa	Karoli	76.206	22.142	2023	7.76	812	0	311	47	0.54	37	46	0	340	68	41	39	2	0.01	0	0
512	Madhya Pradesh	Khandwa	Kelwa Kalan New	76.2664	22.1742	2023	8.12	545	0	250	30	0.74	21	19	0.1	210	36	29	35	1	0.01	0	0
513	Madhya Pradesh	Khandwa	Mundi New	76.4886	22.0642	2023	8.11	666	0	293	27	0.3	27	26	0	240	58	23	49	2	0.01	0	0
514	Madhya Pradesh	Khandwa	Thapana	76.087	22.222	2023	7.59	1665	0	439	212	0.17	67	67	0	660	206	35	71	3	0.01	0	1.61
515	Madhya Pradesh	Khandwa	Udaipur	76.403	22.226	2023	7.65	1139	0	317	117	0.19	52	82	0	425	112	35	61	2	2.23	0	0
516	Madhya Pradesh	Khargone	Amba	75.946	22.043	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.07	0.74	0
517	Madhya Pradesh	Khargone	Balwara	75.975	22.394	2023	7.89	612	0	293	32	0.25	6	2	0.1	255	64	23	27	3	0.06	0	0
518	Madhya Pradesh	Khargone	Barwah	76.035	22.254	2023	7.98	777	0	342	50	0.25	30	10	0	250	52	29	65	5	0.05	0.55	1.7
519	Madhya Pradesh	Khargone	Sanawad New	76.071	22.173	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0.43	0
520	Madhya Pradesh	Khargone	Bhulwani	75.481	21.548	2023	7.26	868	0	390	25	0.29	26	51	0	350	98	26	40	3	0.04	0	0
521	Madhya Pradesh	Khargone	Dhulkot	75.553	21.61	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	0
522	Madhya Pradesh	Khargone	Ghatti	75.667	21.723	2023	7.85	646	0	171	105	0.29	30	12	0	120	24	15	98	3	0.02	0	0
523	Madhya Pradesh	Khargone	Bamnala New	75.853	21.825	2023	7.68	1025	0	317	112	0.09	48	58	0	435	112	38	36	2	0.03	0	0
524	Madhya Pradesh	Khargone	Bhikangaon1	75.956	21.862	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	0.88
525	Madhya Pradesh	Khargone	Bhikangaon2	75.9558	21.8619	2023	8.06	1065	0	195	180	0.12	42	78	0.1	420	124	27	49	2	-	-	-
526	Madhya Pradesh	Khargone	Daudwa	76.137	22.021	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.14	0	1.43
527	Madhya Pradesh	Khargone	Gogaon	75.7444	21.9181	2023	8.06	1772	0	567	87	0.27	102	207	0	675	184	52	89	3	0.05	0	0.91
528	Madhya Pradesh	Khargone	Divalgaon	75.743	21.829	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	0
529	Madhya Pradesh	Khargone	Ziranniya	75.9876	21.6506	2023	7.89	1025	0	384	25	0.31	115	52	0.2	450	118	38	33	2	0.04	0	0
530	Madhya Pradesh	Khargone	Kasrawad1	75.608	22.124	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.08	0.44	0
531	Madhya Pradesh	Khargone	Kasrawad2	75.6083	22.1236	2023	8.01	465	0	220	22	0.12	10	11	0	155	24	23	39	3	-	-	-
532	Madhya Pradesh	Khargone	Sawda	75.629	22.031	2023	7.46	798	0	262	112	0.31	12	2	0	240	52	27	74	2	0.02	0.54	0
533	Madhya Pradesh	Khargone	Khargone	75.6194	21.8278	2023	7.65	1212	0	397	100	0.12	60	92	0	385	92	38	99	4	0.03	0.49	0
534	Madhya Pradesh	Khargone	Un	75.451	21.821	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	0
535	Madhya Pradesh	Khargone	Baddiya	75.948	22.234	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.06	0.54	0
536	Madhya Pradesh	Khargone	Dhargaon	75.597	22.209	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0.88	0
537	Madhya Pradesh	Khargone	Maheshwar	75.588	22.178	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.04	0.5	0
538	Madhya Pradesh	Khargone	Piplyabuzrug	75.861	22.234	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
539	Madhya Pradesh	Mandla	Anjania	80.5094	22.495	2023	7.97	912	0	403	62	0.3	25	15	0	310	70	33	68	1	0.01	0.65	2.03
540	Madhya Pradesh	Mandla	Bichhia1	80.7	22.452	2023	7.72	697	0	317	60	0.21	26	9	0.1	280	56	34	44	2	0.21	0	0.78
541	Madhya Pradesh	Mandla	Sijhora	80.777	22.426	2023	7.32	1245	0	226	245	0.35	43	47	0.81	610	170	45	15	3	0.06	0	0.79
542	Madhya Pradesh	Mandla	Chawai	80.2452	22.9585	2023	7.78	342	0	165	20	0.09	7	1	0.61	135	28	16	22	1	0.07	0	0
543	Madhya Pradesh	Mandla	Khamher Kheda	80.151	22.982	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.4	0	0
544	Madhya Pradesh	Mandla	Ghughri	80.69	22.6778	2023	7.57	412	0	177	32	0.11	3	3	0	170	38	18	17	2	0.79	0.64	0
545	Madhya Pradesh	Mandla	Bamhni New	80.368	22.476	2023	7.93	1315	0	549	132	0.05	31	6	0	560	158	40	52	2	0.11	1.13	0.96
546	Madhya Pradesh	Mandla	Devgaon	80.525	22.739	2023	7.78	912	0	403	62	0.27	28	12	0	405	64	60	29	1	0.02	0	0
547	Madhya Pradesh	Mandla	Khari	80.411	22.793	2023	7.63	345	0	146	17	0.4	9	20	0.1	165	32	21	9	1	0.22	0	0
548	Madhya Pradesh	Mandla	Mahania Patpara	80.477	22.685	2023	7.67	605	0	299	25	0.16	12	7	0	230	56	22	34	0	0.03	0	0
549	Madhya Pradesh	Mandla	Mandla1	80.369	22.6	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.8	0	0
550	Madhya Pradesh	Mandla	Padmi Choraha	80.41	22.55	2023	7.98	512	0	256	22	0.17	6	1	0	175	50	12	35	9	0.03	1.13	0
551	Madhya Pradesh	Mandla	Pathiri Patpara	80.471	22.608	2023	7.71	710	0	262	57	0.29	22	40	0	300	52	41	29	2	0.04	0	0
552	Madhya Pradesh	Mandla	Pindrai	80.5208	22.6139	2023	7.75	512	0	244	22	0.12	10	12	0	215	28	35	16	2	0.01	0	0
553	Madhya Pradesh	Mandla	Ramnagar1	80.521	22.614	2023	7.93	845	0	378	55	0.38	23	6	0	310	68	34	53	6	0.07	0.79	0
554	Madhya Pradesh	Mandla	Subhariya	80.271	22.526	2023	7.85	545	0	250	32	0.29	16	2	0.4	215	36	30	29	1	0.02	0	0
555	Madhya Pradesh	Mandla	Mangli	80.9033	22.3453	2023	7.53	445	0	226	22	0.37	6	16	0	195	38	24	19	1	0.04	0	0
556	Madhya Pradesh	Mandla	Motinala	80.903	22.345	2023	7.82	1023	0	268	155	2.3	65	17	3.29	385	92	38	65	1	0.1	0	1.03
557	Madhya Pradesh	Mandla	Chabi	80.7	22.825	2023	7.66	512	0	250	17	0.17	8	10	0	205	40	26	25	1	0.14	0	0
558	Madhya Pradesh	Mandla	Indira	80.597	22.761	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	0
559	Madhya Pradesh	Mandla	Rehgaon	80.577	22.749	2023	7.83	623	0	305	25	0.36	18	12	0	255	44	35	35	1	0.01	0	0
560	Madhya Pradesh	Mandla	Rampuri New	80.264	22.409	2023	7.93	802	0	390	37	0.16	20	15	0	300	60	36	49	1	0.08	0	0
561	Madhya Pradesh	Mandla	Surajpura	80.138	22.521	2023	7.68	251	0	128	7	0.29	5	1	0	105	24	11	8	1	0.01	0	0
562	Madhya Pradesh	Mandla	Babaliya	80.414	22.883	2023	7.68	697	0	275	50	0.45	32	43	0	315	84	26	25	1	0	0	0
563	Madhya Pradesh	Mandla	Kudomali New	80.213	22.879	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	0
564	Madhya Pradesh	Mandla	Mangalganj	80.311	22.75	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.36	0	0
565	Madhya Pradesh	Mandsaur	Babulda	75.688	24.474	2023	7.89	1543	0	415	175	0.56	48	88	0	525	150	36	84	2	0	0	0
566	Madhya Pradesh	Mandsaur	Badodiya	75.6892	24.5992	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
567	Madhya Pradesh	Mandsaur	Bhanpura	75.7472	24.5128	2023	8.02	456	0	159	25	0.23	39	22	0	210	72	7	14	1	0	0	0
568	Madhya Pradesh	Mandsaur	Dudhkheri	75.6847	24.4314	2023	7.97	1441	0	311	137	0.46	117	140	0	625	162	54	29	2	0	0	0
569	Madhya Pradesh	Mandsaur	Sandhara	75.868	24.561	2023	7.12	688	0	256	25	0.89	36	71	0	290	46	43	31	3	0.15	0	0
570	Madhya Pradesh	Mandsaur	Barkheranayak	75.522	24.219	2023	7.96	2010	0	580	255	0.52	82	177	0	875	264	52	85	2	0	0.72	0
571	Madhya Pradesh	Mandsaur	Dharmarajeshwer	75.5	24.1925	2023	8.21	782	0	366	30	0.26	11	19	0	290	102	9	34	6	0	0	0
572	Madhya Pradesh	Mandsaur	Garoth New	75.6606	24.3381	2023	7.65	1560	0	177	370	0.4	43	77	0	635	144	67	72	3	0	0	0
573	Madhya Pradesh	Mandsaur	Shamgarh2	75.64	24.1914	2023	7.33	588	0	171	70	0.79	41	5	0	260	64	24	20	3	0	0.67	0
574	Madhya Pradesh	Mandsaur	Malhargarh	74.991	24.278	2023	7.56	2723	0	433	625	0.45	52	28	0	910	244	73	185	3	0	0	0
575	Madhya Pradesh	Mandsaur	Narayangarh	75.054	24.267	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.12	0.58	0
576	Madhya Pradesh	Mandsaur	Pipaliya	75.008	24.196	2023	7.56	1010	0	317	75	1.21	54	65	0	400	124	22	43	1	0.2	0	0
577	Madhya Pradesh	Mandsaur	Atitkhedi	75.0822	24.0239	2023	7.49	826	0	293	62	0.86	51	46	0	310	118	4	65	1	-	-	-
578	Madhya Pradesh	Mandsaur	Botalganj	75.0292	24.1483	2023	7.95	992	0	488	80	0.58	6	3	0	430	102	43	45	1	0.15	0	0
579	Madhya Pradesh	Mandsaur	Chirmoliya	75.2569	24.0222	2023	7.45	1115	0	543	95	0.47	15	5	0	460	164	12	68	2	0	0.69	0
580	Madhya Pradesh	Mandsaur	Daloda2	75.0989	23.925	2023	7.23	1088	0	317	117	0	60	91	0	405	124	23	78	2	0	0	0
581	Madhya Pradesh	Mandsaur	Kachnera	75.103	23.864	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
582	Madhya Pradesh	Mandsaur	Mandsaur	75.053	24.053	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0.6	0
583	Madhya Pradesh	Mandsaur	Nayakhera	75.083	24.014	2023	7.45	1888	0	354	320	0.23	96	154	0	585	204	18	176	3	0.37	0	0
584	Madhya Pradesh	Mandsaur	Sitamau	75.349	24.013	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.05	0.58	0
585	Madhya Pradesh	Mandsaur	Surjani	75.445	24.025	2023	7.89	1893	0	476	350	0.32	74	51	0	805	196	77	92	4	0	0	0
586	Madhya Pradesh	Mandsaur	Suwasara	75.643	24.077	2023	7.65	831	0	226	105	0.32	49	29	0	280	82	18	58	2	0	0	0
587	Madhya Pradesh	Mandsaur	Basakheda	74.9455	24.032	2023	7.86	1031	0	220	130	0.49	62	98	0	450	100	49	25	3	0	0	0
588	Madhya Pradesh	Morena	Bilgaon	77.8392	26.3758	2023	8.03	1413	0	506	140	0.57	46	35	0	420	88	49	129	2	0.02	2.49	2.07
589	Madhya Pradesh	Morena	Jafrabad	77.877	26.431	2023	7.8	1001	0	342	97	0.52	42	34	0	240	50	28	117	2	0.03	0	5.33
590	Madhya Pradesh	Morena	Khera Mewda New	78.09	26.563	2023	7.29	1659	0	580	185	0.33	49	23	0	390	82	45	198	4	0.01	0.49	5.59
591	Madhya Pradesh	Morena	Huseinpur	77.6026	26.4041	2023	7.68	1207	0	458	115	0.58	35	15	0	265	76	18	152	3	0.08	0.58	6.88
592	Madhya Pradesh	Morena	Pahargarh	77.639	26.2	2023	7.53	1758	0	653	170	0.56	46	41	0	430	104	41	203	2	0.02	0.61	2.5
593	Madhya Pradesh	Morena	Aurethi	78.38	26.678	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	3.18
594	Madhya Pradesh	Morena	Porsa	78.369	26.671	2023	7.7	1809	0	708	162	0.48	38	39	0	395	86	44	230	2	0.02	0	4.28
595	Madhya Pradesh	Morena	Mangrol	77.352	26.223	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	4.98
596	Madhya Pradesh	Morena	Ranipura	77.335	26.206	2023	7.32	1660	0	482	407	0.72	52	254	0	475	152	23	370	3	0.02	0	10.23
597	Madhya Pradesh	Morena	Tentra	77.305	26.177	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0	3.06
598	Madhya Pradesh	Morena	Tonga Gaon	77.4381	26.2553	2023	7.5	940	0	293	95	0.63	27	69	0	255	56	28	97	2	0.01	0	1.58
599	Madhya Pradesh	Narsinghpur	Salichauka	78.6667	22.8306	2023	8.07	625	0	268	50	0.27	14	2	0.1	270	82	16	28	1	0	0	3.51
600	Madhya Pradesh	Narsinghpur	Gundrai(Ii)	79.0319	23.1772	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.33	1.1	0.93
601	Madhya Pradesh	Narsinghpur	Koudiya	78.816	22.946	2023	7.96	1235	0	519	77	0.54	16	58	0	430	106	40	85	2	0.03	0.66	1.39
602	Madhya Pradesh	Narsinghpur	Tendukhera	78.8711	23.175	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.23	0.95	0
603	Madhya Pradesh	Narsinghpur	Deoribadwani	78.6819	22.9167	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0.79	0.85
604	Madhya Pradesh	Narsinghpur	Bauchhar	79.3336	22.9869	2023	8.04	712	0	354	27	0.5	34	2	0	265	70	22	45	5	0	0.49	0
605	Madhya Pradesh	Narsinghpur	Gotegaon	79.4806	23.0394	2023	8.04	1789	0	519	180	0.55	102	104	0.3	440	112	39	212	2	0.08	0	6.32
606	Madhya Pradesh	Narsinghpur	Jhoteshwar	79.5583	22.9478	2023	7.89	856	0	458	37	0.52	18	10	0	280	92	12	85	2	0	0.7	2.3
607	Madhya Pradesh	Narsinghpur	Karakbel New	79.3543	22.9975	2023	8.09	789	0	378	50	0.54	18	3	0	305	78	27	45	2	0.08	0	1.19
608	Madhya Pradesh	Narsinghpur	Kareli Basti	79.068	22.911	2023	8.14	1145	0	488	62	0.59	48	16	0.4	315	68	35	112	2	0.03	1.08	5.03
609	Madhya Pradesh	Narsinghpur	Ramkhiria	79.1625	23.1014	2023	7.72	888	0	476	25	0.78	8	2	0	325	90	24	54	2	0.84	0.72	6.33
610	Madhya Pradesh	Narsinghpur	Bachai	79.306	22.874	2023	7.76	656	0	317	25	0.57	10	12	0	260	68	22	36	1	0.03	0.94	1.62
611	Madhya Pradesh	Narsinghpur	Bhainsa	79.224	22.848	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	4.5	4.67
612	Madhya Pradesh	Narsinghpur	Nandwara	79.176	22.959	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	2.26
613	Madhya Pradesh	Neemuch	Dadoli	75.041	24.674	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.1	0.84	0
614	Madhya Pradesh	Neemuch	Lalpura	74.926	24.614	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	5.41
615	Madhya Pradesh	Neemuch	Patan1	75.211	24.907	2023	7.72	1190	0	409	77	1.14	102	5	0	451	108	44	52	3	-	-	-
616	Madhya Pradesh	Neemuch	Ratangarh	75.109	24.811	2023	7.3	801	0	256	97	0.38	47	5	0	270	64	27	63	1	0	0	0
617	Madhya Pradesh	Neemuch	Singoli	75.288	24.968	2023	7.83	1323	0	311	182	0.26	80	1	0.1	375	92	35	118	2	0	0	0
618	Madhya Pradesh	Neemuch	Barlai	75.32	24.424	2023	8.08	667	0	281	25	0.81	16	11	0	225	64	16	38	4	0	0	0
619	Madhya Pradesh	Neemuch	Besla	75.457	24.554	2023	7.83	512	0	226	25	0.4	22	3	0	225	64	16	15	5	0	0	0
620	Madhya Pradesh	Neemuch	Bhadanadw	75.369	24.561	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
621	Madhya Pradesh	Neemuch	Chachor	75.357	24.372	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.71	0	0
622	Madhya Pradesh	Neemuch	Gota Pipliya	75.223	24.48	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	4.28
623	Madhya Pradesh	Neemuch	Jamalpura	75.464	24.487	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	2.95
624	Madhya Pradesh	Neemuch	Kukreshwar	75.268	24.48	2023	7.94	3498	0	519	605	0.38	114	347	0.3	1025	130	170	343	3	0	0	6.26
625	Madhya Pradesh	Neemuch	Kundaliya	75.331	24.467	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
626	Madhya Pradesh	Neemuch	Manasa	75.144	24.471	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	1.3	0	0
627	Madhya Pradesh	Neemuch	Rampura	75.441	24.462	2023	7.87	926	0	384	80	0.49	23	3	0	305	84	23	72	4	0	0	0
628	Madhya Pradesh	Neemuch	Girdola	74.932	24.462	2023	7.94	1488	0	342	280	0.52	46	4	0	325	68	38	190	3	0.06	1.81	0
629	Madhya Pradesh	Neemuch	Kacholi	74.941	24.363	2023	7.68	1642	0	268	390	0.71	19	5	0.2	660	182	50	69	3	0.11	0.6	0
630	Madhya Pradesh	Neemuch	Nayagaon2	74.776	24.561	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	3.27
631	Madhya Pradesh	Neemuch	Neemuch	74.874	24.454	2023	7.95	1844	0	628	267	1.1	37	5	0	510	74	79	202	2	0.06	0	0
632	Madhya Pradesh	Neemuch	Savan	75.063	24.452	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
633	Madhya Pradesh	Neemuch	Semali Chandrawat	74.936	24.548	2023	8.06	2103	0	433	327	0.37	99	4	0.2	410	66	60	250	4	0	1.45	4.42
634	Madhya Pradesh	Panna	Ajaigarh	80.2675	24.9903	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.34	0	2.42
635	Madhya Pradesh	Panna	Banahari Kalan	80.1786	24.8536	2023	7.96	648	0	336	20	0.59	26	10	0	285	58	34	27	1	0.03	0	1.76
636	Madhya Pradesh	Panna	Bariyarpur	80.095	24.8494	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.21	0	18.09
637	Madhya Pradesh	Panna	Sinhai	80.2253	24.92	2023	8.02	816	0	439	37	0.63	12	2	0	335	100	21	45	1	0.02	0	1.45
638	Madhya Pradesh	Panna	Gunaur	80.251	24.463	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.02	0.42	1.71
639	Madhya Pradesh	Panna	Salleha	80.4025	24.4133	2023	8.09	793	0	348	47	0.17	8	16	0	255	56	28	56	2	0.02	0.5	1.08
640	Madhya Pradesh	Panna	Akola	80.132	24.619	2023	7.53	282	0	128	20	0.21	2	5	0	85	20	9	28	2	0.05	0	0
641	Madhya Pradesh	Panna	Backchur	80.102	24.722	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.01	0	1.15
642	Madhya Pradesh	Panna	Badagaon	80.3456	24.6236	2023	7.01	312	0	85	45	0.15	6	14	0	75	24	4	39	3	0.21	0	0
643	Madhya Pradesh	Panna	Bahera	80.255	24.662	2023	7.07	312	0	128	30	0.12	4	12	0	80	16	10	38	2	0.02	0	0
644	Madhya Pradesh	Panna	Barrachh	80.173	24.545	2023	7.92	536	0	293	20	0.44	6	2	0	225	46	27	28	4	0.02	0	1.49
645	Madhya Pradesh	Panna	Madla	80.011	24.729	2023	7.45	600	0	140	62	0.07	18	67	0	185	42	19	42	2	0.03	0.79	0
646	Madhya Pradesh	Panna	Panna1	80.1806	24.7056	2023	7.95	1956	0	470	385	0.36	52	2	0	455	138	27	232	33	0.01	0.59	1.89
647	Madhya Pradesh	Panna	Tara	80.089	24.533	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.1	0	0.86
648	Madhya Pradesh	Panna	Hathkuri	80.069	24.246	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
649	Madhya Pradesh	Panna	Kharmora	80.261	24.122	2023	8.07	1389	0	378	205	0.22	72	3	0	335	68	40	148	17	0.06	0	4.45
650	Madhya Pradesh	Panna	Mohendra	79.966	24.191	2023	7.96	1658	0	348	350	0.71	42	2	0	505	124	47	145	3	0.01	0	4.25
651	Madhya Pradesh	Panna	Powai	80.1653	24.2647	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.97	0	6.44
652	Madhya Pradesh	Panna	Semaria1	79.9	24.2686	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	1.09	0.59	1.13
653	Madhya Pradesh	Panna	Kuankheda	79.923	23.901	2023	7.87	975	0	311	150	0.46	4	2	0	240	40	34	112	2	0.3	1.31	3.36
654	Madhya Pradesh	Panna	Pandepurwa	80.3147	23.9792	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.1	0	2.09
655	Madhya Pradesh	Panna	Raipura	79.952	23.904	2023	7.99	612	0	207	75	0.24	30	4	0	175	40	18	64	2	0.21	0	2.3
656	Madhya Pradesh	Panna	Saharan	79.9653	24.0806	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.19	0	8.38
657	Madhya Pradesh	Panna	Takhori	79.951	23.988	2023	7.83	498	0	207	37	0.41	8	4	0	180	38	21	27	3	0.02	0	1.85
658	Madhya Pradesh	Raisen	Bari	78.083	23.031	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.08	0.9	1.8
659	Madhya Pradesh	Raisen	Begumganj	78.349	23.607	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	0
660	Madhya Pradesh	Raisen	Padahjhir	78.404	23.573	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0	0	0
661	Madhya Pradesh	Raisen	Paloha	78.296	23.532	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.03	0	1.04
662	Madhya Pradesh	Raisen	Sult	78.555	23.503	2023	-	-	-	-	-	-	-	-	-	-	-	-	-	-	0.38	0	0
663	Gujarat	Ahmedabad	Sabarmati	72.58	23.08	2023	7.8	1100	0	300	150	0.5	80	25	0.1	450	80	60	110	5	0.4	2.5	1.5
664	Gujarat	Ahmedabad	Maninagar	72.60	22.99	2023	8.1	1300	0	350	180	0.7	95	30	0.15	500	90	70	130	6	0.5	3.0	2.0
665	Gujarat	Ahmedabad	Vastrapur	72.51	23.03	2023	7.9	950	0	250	120	0.4	70	20	0.08	400	70	55	100	4	0.3	1.8	1.2
666	Assam	Kamrup Metropolitan	Guwahati	91.7362	26.1445	2023	7.2	450	0	180	40	0.2	30	10	0.05	200	40	25	50	3	0.8	15.0	0.8
667	Assam	Dibrugarh	Dibrugarh	94.9120	27.4705	2023	7.4	380	0	150	30	0.18	25	8	0.04	180	35	20	45	2	0.7	12.0	0.7
Haryana	Palwal	Dighaut	77.375	28.0375	2023	7.8	3410	0	514	467	1.2	587	31	0	719	134	93	469	21	0.02	0.75	33.18
Haryana	Palwal	Hodal	77.35	27.8833	2023	7.69	1410	0	201	297	1.2	67	104	0	470	62	77	116	9	0.02	0.31	18.21
Haryana	Palwal	Khambi	77.4186	27.965	2023	7.36	1976	0	286	433	1.68	117	7	0	540	93	75	167	82	-	-	-
Haryana	Palwal	Pirgarhi	77.4742	28.0311	2023	7.96	1859	0	248	297	2.3	289	18	0	475	54	83	221	5	0.14	0.36	9.76
Haryana	Palwal	Tumsara	77.3409	28.007	2023	7.41	5749	0	476	901	0.64	1163	34	0	810	102	135	908	78	0.03	0.18	1.57
Haryana	Palwal	Banswan	77.4475	27.9005	2023	7.87	1565	0	326	284	0.65	117	15	0	490	56	85	147	1	0.04	0.56	16.67
Haryana	Palwal	Lohina	77.3119	27.9448	2023	7.14	7366	0	583	1476	1.2	1089	9	0	1647	210	273	914	29	0.08	0.18	6.26
Haryana	Palwal	Badoli	77.4332	28.0693	2023	7.73	1754	0	268	384	0.81	97	10	0	525	28	111	167	1	1.22	0.28	12.78
Haryana	Palwal	Baghaula	77.308	28.221	2023	7.49	6879	0	207	736	0.71	1682	578	0	2251	52	515	457	115	-	-	-
Haryana	Palwal	Bela	77.4264	28.0203	2023	8.2	2714	0	510	412	2.8	339	18	0	764	88	132	268	2	0.01	1.2	14.61
Haryana	Palwal	Jawan	77.3942	28.235	2023	7.73	1349	0	317	185	1.1	171	5	0	376	20	79	134	12	2.04	0.75	8.94
Haryana	Palwal	Kashipur	77.4995	28.0101	2023	7.45	1171	0	416	123	2.2	64	20	0	379	64	53	91	4	0.29	0.29	16.56
Haryana	Palwal	Kulina	77.4491	28.199	2023	7.79	1684	0	354	363	1.1	37	20	0	430	88	51	202	1	0.03	1.11	13.27
Haryana	Palwal	Palwal	77.3238	28.1532	2023	7.82	2251	0	383	263	1.7	412	35	0	565	68	96	267	8	0.05	1.16	22.02
Haryana	Palwal	Pehladpur	77.4699	28.1365	2023	7.7	1325	0	396	145	0.72	128	11	0	390	61	58	125	19	3.71	0.24	4.96
Haryana	Palwal	Pehrukha	77.4491	28.1956	2023	8.11	618	0	323	71	0.71	0	5	0	312	62	38	22	1	0.46	0.67	10.28
Haryana	Palwal	Pelak	77.4048	28.1384	2023	7.56	2275	0	389	346	0.7	287	51	0	550	30	115	254	12	0.06	0.34	4.57
Haryana	Palwal	Rasulpur	77.3982	28.0865	2023	7.6	1137	0	449	71	0.81	29	111	0	395	42	71	78	4	0.03	0.66	20.57
Haryana	Palwal	Theraka	77.3845	28.1277	2023	7	4502	0	483	710	0.67	810	58	0	725	130	97	694	60	0.08	0.2	4.63
668	Assam	Jorhat	Jorhat	94.2037	26.7523	2023	7.3	410	0	160	35	0.19	28	9	0.05	190	38	22	48	3	0.75	14.0	0.75`;

function parsePreloadedData(): SampleData[] {
  const lines = rawData.trim().split('\n');
  const headerLine = lines.shift();
  if (!headerLine) return [];

  const headers = headerLine.split('\t').map(h => h.trim());

  const latIndex = headers.indexOf('Latitude');
  const lonIndex = headers.indexOf('Longitude');
  const feIndex = headers.indexOf('Fe (ppm)');
  const asIndex = headers.indexOf('As (ppb)');

  if (latIndex === -1 || lonIndex === -1) {
    console.error("Preloaded data requires 'Latitude' and 'Longitude' headers.");
    return [];
  }

  const samples: SampleData[] = [];
  lines.forEach((line, index) => {
    const values = line.split('\t');
    const latitude = parseFloat(values[latIndex]);
    const longitude = parseFloat(values[lonIndex]);

    if (isNaN(latitude) || isNaN(longitude)) {
        return;
    }

    const concentrations: Record<string, number | undefined> = {};

    // Parse Iron (Fe) from ppm (which is mg/L)
    if (feIndex > -1) {
        const value = values[feIndex]?.trim();
        if(value && value !== '-') {
            const feValue = parseFloat(value);
            if (!isNaN(feValue)) {
                concentrations[Metal.Fe] = feValue;
            }
        }
    }

    // Parse Arsenic (As) from ppb (micrograms/L) to mg/L
    if (asIndex > -1) {
        const value = values[asIndex]?.trim();
        if(value && value !== '-') {
            const asValue = parseFloat(value);
            if (!isNaN(asValue)) {
                concentrations[Metal.As] = asValue / 1000;
            }
        }
    }
    
    // For other metals, since they are not in the data, let's add some placeholder values
    // to make the app more visually interesting.
    const base = ((latitude + longitude) % 1) / 5; // scaled down to make it more realistic
    if (index % 3 === 0) concentrations[Metal.Pb] = parseFloat((base * 0.01).toFixed(5));
    if (index % 7 === 0) concentrations[Metal.Hg] = parseFloat((base * 0.001).toFixed(5));
    if (index % 4 === 0) concentrations[Metal.Cd] = parseFloat((base * 0.0015).toFixed(5));
    if (index % 5 === 0) concentrations[Metal.Cr] = parseFloat((base * 0.025).toFixed(5));
    if (index % 2 === 0) concentrations[Metal.Ni] = parseFloat((base * 0.01).toFixed(5));
    if (index % 3 === 1) concentrations[Metal.Zn] = parseFloat((base * 0.5).toFixed(5));
    
    // filter out zero values from placeholder to not clutter the UI
    for (const key in concentrations) {
        if(concentrations[key] === 0) {
            concentrations[key] = undefined;
        }
    }

    samples.push({
      id: `preloaded-${index + 1}`,
      latitude,
      longitude,
      concentrations: concentrations as Record<Metal, number | undefined>,
    });
  });

  return samples;
};

export const PRELOADED_SAMPLES = parsePreloadedData();