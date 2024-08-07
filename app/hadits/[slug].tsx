import CardHadits, { LoadingSkeletonCardHadits } from '@/components/CardHadits';
import { HaditsDetailModel } from '@/interfaces/hadits-interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

function HaditsScreen() {
  const { slug } = useLocalSearchParams();
  const [detailHadits, setDetailHadits] =
    React.useState<HaditsDetailModel | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const getHadits = async (page: number) => {
      try {
        const storedData = await AsyncStorage.getItem(`hadits_${slug}_${page}`);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (page === 1) {
            setDetailHadits(parsedData);
          } else {
            setDetailHadits((prevState) => ({
              ...(prevState || {
                name: '',
                slug: '',
                total: 0,
                pagination: {
                  totalItems: 0,
                  currentPage: 1,
                  pageSize: 0,
                  totalPages: 1,
                  startPage: 1,
                  endPage: 1,
                  startIndex: 0,
                  endIndex: 0,
                  pages: [],
                },
                items: [],
              }),
              items: [...(prevState?.items || []), ...parsedData.items],
            }));
          }
          setIsLoading(false);
          setIsLoadingMore(false);
        } else {
          const { data } = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL_3}/${slug}?page=${page}`
          );
          await AsyncStorage.setItem(
            `hadits_${slug}_${page}`,
            JSON.stringify(data)
          );
          if (page === 1) {
            setDetailHadits(data);
          } else {
            setDetailHadits((prevState) => ({
              ...(prevState || {
                name: '',
                slug: '',
                total: 0,
                pagination: {
                  totalItems: 0,
                  currentPage: 1,
                  pageSize: 0,
                  totalPages: 1,
                  startPage: 1,
                  endPage: 1,
                  startIndex: 0,
                  endIndex: 0,
                  pages: [],
                },
                items: [],
              }),
              items: [...(prevState?.items || []), ...data.items],
            }));
          }
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      } catch (error) {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };

    getHadits(currentPage);
  }, [slug, currentPage]);

  const handleLoadMore = () => {
    if (
      detailHadits &&
      !isLoadingMore &&
      currentPage < detailHadits.pagination.totalPages
    ) {
      setIsLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const renderFooter = () => {
    return isLoadingMore ? (
      <View className="py-4">
        <ActivityIndicator size="large" color="#3cb09c" />
      </View>
    ) : null;
  };

  if (isLoading) {
    return (
      <ScrollView className="flex-1 bg-white px-6">
        <View className="flex flex-col items-center justify-center gap-3 py-5 border-b border-gray-200 mt-3">
          <View
            className="bg-gray-100"
            style={{
              width: 200,
              height: 20,
              borderRadius: 4,
            }}
          />
          <View
            className="bg-gray-100"
            style={{
              width: 100,
              height: 20,
              borderRadius: 4,
            }}
          />
        </View>
        <View className="flex-col gap-5 my-5 pb-28">
          {[...Array(5)].map((_, index) => (
            <LoadingSkeletonCardHadits key={index} />
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <FlatList
      data={detailHadits?.items}
      keyExtractor={(item) => item.number.toString()}
      ListHeaderComponent={
        <View className="flex flex-col items-center justify-center gap-3 py-5 border-b border-gray-200">
          <Text className="font-bold text-xl">{detailHadits?.name}</Text>
          <Text className="font-medium text-gray-400 text-sm">
            {detailHadits?.total} Riwayat
          </Text>
        </View>
      }
      renderItem={({ item }) => <CardHadits {...item} />}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      className="bg-white"
      contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 150 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default HaditsScreen;
