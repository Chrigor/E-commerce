import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container,
  SearchInput,
  Header,
  IconMargin,
  ContainerSliders,
  ContainerImageSlider,
  TitleSlide,
  SubTitleSlide,
  ContainerBackgroundImage,
  ContainerCategoria,
  TitleCategory,
  SubTitleCategory,
  HeaderCategory,
  CategoryButton,
  ContainerIconCategory,
  TextCategory,
  ProductContainer,
  ContainerSale,
  ImageProduct,
  TextDescont,
} from './style';

const data = [
  {
    id: 2,
    title: 'Hello1',
    description: 'usaduhsahusaduhuhasduhhausuhsaduhsdauhasd',
    image:
      'https://png.pngtree.com/thumb_back/fw800/background/20190215/pngtree-blue-pure-color-simple-background-image_3724.jpg',
  },
  {
    id: 4,
    title: 'Hello2',
    description: 'ASKDAS',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTTah2GGpiEWqBoLPGbjojgQrYgRHzRaqHWhAJwW7a1-rnih-fa&usqp=CAU',
  },
  {
    id: 5,
    title: 'Hello3',
    description: 'asdkasjd',
    image:
      'https://c4.wallpaperflare.com/wallpaper/829/213/283/red-color-simple-background-minimalism-buildings-black-art-wallpaper-preview.jpg',
  },
  {
    id: 6,
    title: 'Hello4',
    description: 'asdkasjd',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSBStLqMv5fIirCzb3ufL9eauqY7pYp6Pat0L_2pDxavVcvvPmy&usqp=CAU',
  },
];

const dataCategory2 = [
  {
    id: 1,
    title: 'T-shirts',
    nameIcon: 'percent',
  },
  {
    id: 2,
    title: 'T-shirts',
    nameIcon: 'rocket',
  },
  {
    id: 3,
    title: 'T-shirts',
    nameIcon: 'adn',
  },
  {
    id: 4,
    title: 'T-shirts',
    nameIcon: 'amazon',
  },
  {
    id: 5,
    title: 'T-shirts',
    nameIcon: 'home',
  },
  {
    id: 6,
    title: 'T-shirts',
    nameIcon: 'ambulance',
  },
  {
    id: 7,
    title: 'T-shirts',
    nameIcon: 'at',
  },
  {
    id: 8,
    title: 'T-shirts',
    nameIcon: 'android',
  },
];

const dataProductsFlashSale = [
  {
    id: 1,
    name: 'Generic Shoes',
    description:
      'Lorem ipsum ultricies eleifend sapien tristique ut eros, sapien aliquam velit venenatis ut potenti. habitasse senectus elit vestibulum aliquam cras pulvinar platea mauris euismod ligula accumsan, convallis sem metus rhoncus viverra augue gravida accumsan ultricies primis, cursus dapibus faucibus adipiscing nulla lectus sodales risus ut integer. accumsan dui potenti torquent dictum duis diam nisl, quam non platea nam massa porta, enim aenean cursus curae sociosqu condimentum. integer nostra id diam ultricies lectus mi proin, sodales nunc vel porta mattis ut ullamcorper aliquam, suscipit porttitor elit quis consequat pharetra. porta lacus curabitur diam tristique malesuada congue torquent nisi lectus, egestas et mi tellus praesent neque augue rutrum, enim posuere vitae aenean ultricies inceptos ut pulvinar.',
    category: 'Shoes',
    price: 170.32,
    descont: 17,
    image: [
      'https://d129q82p91aw7f.cloudfront.net/df2f90248bb2/tenis-dc-shoes-heathrow-imp-feminino-feminino.200x200.jpg',
      'https://d129q82p91aw7f.cloudfront.net/df2f90248bb2/tenis-dc-shoes-heathrow-imp-feminino-feminino.200x200.jpg',
      'https://d129q82p91aw7f.cloudfront.net/df2f90248bb2/tenis-dc-shoes-heathrow-imp-feminino-feminino.200x200.jpg',
    ],
    size: [6, 7, 8, 9, 10, 11, 12],
    colors: ['blue', 'yellow', 'gray', 'red'],
    stars: 3,
    lastReview: {},
  },
  {
    id: 2,
    name: 'Pantuffs',
    description:
      'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    category: 'Shoes',
    price: 130.32,
    descont: 13,
    image: [
      'https://www.pantufas.com.br/arquivos/categorias_pantufas3d.png?v=636979505582000000',
      'https://pantufas.vteximg.com.br/arquivos/ids/158303-400-400/pantufa-3d-garra-sulley-2019-frontal.jpg?v=636977748222170000',
    ],
    size: [35, 47, 74],
    colors: ['blue', 'yellow', 'gray', 'red'],
    stars: 4,
    lastReview: {
      idUser: 3,
      photo:
        'https://img.pngio.com/png-avatar-108-images-in-collection-page-3-png-avatar-300_300.png',
      comment:
        'Turpis dictum fringilla et neque vitae quisque, condimentum tincidunt nec arcu dapibus class eu, molestie risus id sit faucibus. vestibulum odio ad vehicula donec netus posuere urna donec class,',
      stars: 3,
    },
  },
  {
    id: 3,
    name: 'Play 4',
    description:
      'Lorem ipsum ultricies eleifend sapien tristique ut eros, sapien aliquam velit venenatis ut potenti. habitasse senectus elit vestibulum aliquam cras pulvinar platea mauris euismod ligula accumsan, convallis sem metus rhoncus viverra augue gravida accumsan ultricies primis, cursus dapibus faucibus adipiscing nulla lectus sodales risus ut integer. accumsan dui potenti torquent dictum duis diam nisl, quam non platea nam massa porta, enim aenean cursus curae sociosqu condimentum. integer nostra id diam ultricies lectus mi proin, sodales nunc vel porta mattis ut ullamcorper aliquam, suscipit porttitor elit quis consequat pharetra. porta lacus curabitur diam tristique malesuada congue torquent nisi lectus, egestas et mi tellus praesent neque augue rutrum, enim posuere vitae aenean ultricies inceptos ut pulvinar.',
    category: 'Video game',
    price: 1820.32,
    descont: 10,
    image: [
      'https://www.havan.com.br/media/catalog/product/cache/55f334c6f9412d6b39cfe195ce4e3943/v/_/v_deo-game-playstation-4-bundle-hits-family_301631_1.jpg'
    ],
    size: [6, 7, 8, 9, 10, 11, 12],
    colors: ['blue', 'yellow', 'gray', 'red'],
    stars: 3,
    lastReview: {
      idUser: 3,
      photo:
        'https://img.pngio.com/png-avatar-108-images-in-collection-page-3-png-avatar-300_300.png',
      comment:
        'Turpis dictum fringilla et neque vitae quisque, condimentum tincidunt nec arcu dapibus class eu, molestie risus id sit faucibus. vestibulum odio ad vehicula donec netus posuere urna donec class,',
      stars: 3,
    },
  },
  {
    id: 4,
    name: 'Play TV',
    description:
      'Lorem ipsum ultricies eleifend sapien tristique ut eros, sapien aliquam velit venenatis ut potenti. habitasse senectus elit vestibulum aliquam cras pulvinar platea mauris euismod ligula accumsan, convallis sem metus rhoncus viverra augue gravida accumsan ultricies primis, cursus dapibus faucibus adipiscing nulla lectus sodales risus ut integer. accumsan dui potenti torquent dictum duis diam nisl, quam non platea nam massa porta, enim aenean cursus curae sociosqu condimentum. integer nostra id diam ultricies lectus mi proin, sodales nunc vel porta mattis ut ullamcorper aliquam, suscipit porttitor elit quis consequat pharetra. porta lacus curabitur diam tristique malesuada congue torquent nisi lectus, egestas et mi tellus praesent neque augue rutrum, enim posuere vitae aenean ultricies inceptos ut pulvinar.',
    category: 'Eletronicos',
    price: 1020.32,
    descont: 5,
    image: [
      'https://http2.mlstatic.com/smarttv-sony-32-led-hd-wi-fi-hdmi-smart-tv-televiso-nf-D_NQ_NP_650898-MLB31820114433_082019-F.jpg'
    ],
    size: [40],
    colors: ['black', 'gray'],
    stars: 5,
    lastReview: {
      idUser: 3,
      photo:
        'https://img.pngio.com/png-avatar-108-images-in-collection-page-3-png-avatar-300_300.png',
      comment:
        'Turpis dictum fringilla et neque vitae quisque, condimentum tincidunt nec arcu dapibus class eu, molestie risus id sit faucibus. vestibulum odio ad vehicula donec netus posuere urna donec class,',
      stars: 5,
    },
  },
];

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const widthDevice = Dimensions.get('screen').width;

  const [dataCarousel, setdataCarousel] = useState([]);
  const [dataCategory, setdataCategory] = useState([]);
  const [dataProducts, setdataProducts] = useState([]);

  const navigation = useNavigation();
  const conteudo = useSelector((state) => state);

  console.log('REDUCER');
  console.log(conteudo);

  useEffect(() => {
    setdataCarousel(data);
    setdataCategory(dataCategory2);
    setdataProducts(dataProductsFlashSale);
  }, []);

  function navigateToProducts(product) {
    navigation.navigate('Product', product);
  }

  function _renderItem({ item, index }) {
    return (
      <ContainerImageSlider onPress={() => alert(item.title)} activeOpacity={1}>
        <ContainerBackgroundImage source={{ uri: item.image }}>
          <TitleSlide>{item.title}</TitleSlide>
          <SubTitleSlide>{item.description}</SubTitleSlide>
        </ContainerBackgroundImage>
      </ContainerImageSlider>
    );
  }

  function renderCategory({ item }) {
    return (
      <CategoryButton onPress={() => alert(item.nameIcon)}>
        <ContainerIconCategory>
          <Icon name={item.nameIcon} size={18} color="#e02041" />
        </ContainerIconCategory>
        <TextCategory>{item.nameIcon}</TextCategory>
      </CategoryButton>
    );
  }

  function renderProduct({ item }) {
    return (
      <ProductContainer
        onPress={() => navigateToProducts(item)}
        activeOpacity={0.9}>
        <ImageProduct
          style={{ height: 70, width: 70 }}
          source={{ uri: item.image[0] }}
        />
        <TextCategory>{item.name}</TextCategory>
        <TextCategory>
          R${' '}
          {String(item.price).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </TextCategory>
        <TextDescont>{item.descont}% OFF</TextDescont>
      </ProductContainer>
    );
  }

  return (
    <Container>
      <Header>
        <SearchInput
          inlineImageLeft="search"
          inlineImagePadding={5}
          placeholder="Search Product"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('FavoriteProducts')}
          activeOpacity={0.8}>
          <IconMargin name="heart" size={24} color="#ddd" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
          activeOpacity={0.8}>
          <IconMargin name="bell" size={24} color="#ddd" />
        </TouchableOpacity>
      </Header>

      <ContainerSliders>
        <Carousel
          ref={(c) => {
            _carousel = c;
          }}
          layout={'default'}
          data={dataCarousel}
          renderItem={_renderItem}
          sliderWidth={widthDevice}
          itemWidth={widthDevice}
          onSnapToItem={(index) => setActiveSlide(index)}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
        />

        <Pagination
          dotsLength={dataCarousel.length}
          activeDotIndex={activeSlide}
          containerStyle={{
            backgroundColor: '#fff',
            paddingVertical: 5,
            width: widthDevice,
          }}
          dotStyle={{
            width: 7,
            height: 7,
            borderRadius: 5,
            marginHorizontal: 8,
            marginVertical: 8,
            backgroundColor: '#e02041',
          }}
          inactiveDotOpacity={0.5}
          inactiveDotScale={0.8}
        />
      </ContainerSliders>

      <ContainerCategoria>
        <HeaderCategory>
          <TitleCategory>Category</TitleCategory>
          <TouchableOpacity
            onPress={() => alert('More category')}
            activeOpacity={0.8}>
            <SubTitleCategory>More Category</SubTitleCategory>
          </TouchableOpacity>
        </HeaderCategory>

        <SafeAreaView>
          <FlatList
            data={dataCategory}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
          />
        </SafeAreaView>
      </ContainerCategoria>

      <ContainerSale>
        <HeaderCategory>
          <TitleCategory>Flash Sale</TitleCategory>
          <TouchableOpacity
            onPress={() => navigation.navigate('Products', dataProducts)}
            activeOpacity={0.8}>
            <SubTitleCategory>See more</SubTitleCategory>
          </TouchableOpacity>
        </HeaderCategory>

        <SafeAreaView>
          <FlatList
            data={dataProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
          />
        </SafeAreaView>
      </ContainerSale>

      <ContainerSale>
        <HeaderCategory>
          <TitleCategory>Mega Sale</TitleCategory>
          <TouchableOpacity
            onPress={() => navigation.navigate('Products', dataProducts)}
            activeOpacity={0.8}>
            <SubTitleCategory>See more</SubTitleCategory>
          </TouchableOpacity>
        </HeaderCategory>

        <SafeAreaView>
          <FlatList
            data={dataProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
          />
        </SafeAreaView>
      </ContainerSale>

      <ContainerImageSlider
        onPress={() => alert('Products recommend for you')}
        activeOpacity={0.9}>
        <ContainerBackgroundImage
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQMdwJ6eX2oxYZbGBEUtSv7GJE7fWSy4z77E-P1hCEwn0CNWmdK&usqp=CAU',
          }}>
          <TitleSlide>Recommended Products</TitleSlide>
          <SubTitleSlide>We recommended the best for you</SubTitleSlide>
        </ContainerBackgroundImage>
      </ContainerImageSlider>
    </Container>
  );
}

export default Home;
